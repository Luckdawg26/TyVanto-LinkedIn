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
  phone: z.string().trim().max(40).optional().default(""),
  topic: z.enum([
    "SEC filing or audit",
    "Financing or lender process",
    "Transaction or acquisition",
    "Board reporting or cash pressure",
    "Interim or fractional CFO coverage",
    "Other finance operating need",
  ]),
  message: z.string().trim().max(800).optional().default(""),
  website: z.string().max(200).optional().default(""),
});

const compact = (value: string) => value.replace(/\s+/g, " ").trim();
const LEAD_RECIPIENT = "mark@midatlanticcfo.com";

async function sendLeadEmail(inquiry: z.infer<typeof inquirySchema>, content: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !from) throw new Error("Transactional email is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [LEAD_RECIPIENT],
      reply_to: inquiry.email,
      subject: `[Lucky CFO Advisory] CFO Readiness Call — ${compact(inquiry.company)}`,
      text: `New Lucky CFO Advisory CFO Readiness Call request\n\n${content}\n\nReply to this email to respond directly to the potential client.`,
      tags: [
        { name: "source", value: "lucky-cfo-advisory" },
        { name: "type", value: "readiness-call-lead" },
      ],
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Transactional email was not accepted (${response.status}): ${detail}`);
  }
}

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
      `Phone: ${compact(inquiry.phone) || "Not provided"}`,
      `What is coming up: ${inquiry.topic}`,
      `Context: ${compact(inquiry.message) || "Not provided"}`,
    ].join("\n");

    try {
      await sendLeadEmail(inquiry, content);
    } catch (error) {
      console.error("Inquiry email delivery failed:", error instanceof Error ? error.message : "Unknown error");
      return res.status(503).json({ error: "The inquiry could not be delivered. Please try again shortly." });
    }

    // This internal notification supplements the confirmed inbox delivery.
    try {
      await notifyOwner(content);
    } catch (error) {
      console.error("Inquiry owner notification failed:", error instanceof Error ? error.message : "Unknown error");
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
