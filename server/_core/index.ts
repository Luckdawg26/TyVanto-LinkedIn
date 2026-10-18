import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(120),
  role: z.string().trim().max(100).optional().default(""),
  topic: z.enum([
    "Close & reporting",
    "Forecasting & cash",
    "Fractional CFO leadership",
    "Financing readiness",
    "M&A / diligence / integration readiness",
    "Other finance operating need",
  ]),
  message: z.string().trim().max(800).optional().default(""),
  website: z.string().max(200).optional().default(""),
});

const compact = (value: string) => value.replace(/\s+/g, " ").trim();

async function notifyOwner(content: string) {
  const apiUrl = process.env.MANUS_API_URL;
  const apiKey = process.env.MANUS_API_KEY;
  if (!apiUrl || !apiKey) throw new Error("Owner notification service is unavailable");

  const response = await fetch(`${apiUrl}/webdevtoken.v1.WebDevService/SendNotification`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "connect-protocol-version": "1",
    },
    body: JSON.stringify({ title: "New Lucky CFO Advisory readiness call request", content }),
  });

  if (!response.ok) throw new Error(`Owner notification was not accepted (${response.status})`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  app.post("/api/inquiry", async (req, res) => {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Please complete the required fields with valid information." });
    }

    const inquiry = parsed.data;
    // Quietly accept honeypot submissions without forwarding them.
    if (inquiry.website) return res.status(202).json({ accepted: true });

    const content = [
      `Name: ${compact(inquiry.name)}`,
      `Email: ${compact(inquiry.email)}`,
      `Company: ${compact(inquiry.company)}`,
      `Role: ${compact(inquiry.role) || "Not provided"}`,
      `Topic: ${inquiry.topic}`,
      `Context: ${compact(inquiry.message) || "Not provided"}`,
    ].join("\n");

    try {
      await notifyOwner(content);
    } catch (error) {
      // Avoid exposing service internals or lead content to the visitor.
      console.error("Inquiry notification failed:", error instanceof Error ? error.message : "Unknown error");
      return res.status(503).json({ error: "The inquiry could not be delivered. Please try again shortly." });
    }

    return res.status(202).json({ accepted: true });
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
