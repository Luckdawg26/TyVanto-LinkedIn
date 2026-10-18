import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // This site declares only `/` as a browser page. Let Vite serve known assets,
  // but do not let its development middleware turn an unknown page into a soft 404.
  app.use((req, res, next) => {
    const viteInternalPath = req.path.startsWith("/@vite/") || req.path.startsWith("/@fs/") || req.path === "/@react-refresh";
    if (req.method === "GET" && req.path !== "/" && !req.path.includes(".") && !viteInternalPath) {
      return res.status(404).type("text/plain").send("Not found");
    }
    next();
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    if (req.method !== "GET" || req.path !== "/") {
      return res.status(404).type("text/plain").send("Not found");
    }
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // This one-page site serves the application shell only at its declared route.
  app.use("*", (req, res) => {
    if (req.method === "GET" && req.path === "/") {
      return res.sendFile(path.resolve(distPath, "index.html"));
    }
    return res.status(404).type("text/plain").send("Not found");
  });
}
