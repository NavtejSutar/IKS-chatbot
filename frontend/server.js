/**
 * Zero-dependency Dev & Production Server for IKS Frontend (ES Module)
 * Serves static frontend files and proxies Spring AI API requests to http://localhost:8080
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const BACKEND_HOST = process.env.BACKEND_HOST || "localhost";
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jsx": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf"
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // 1. Proxy API endpoints to Spring Boot Backend
  if (pathname.startsWith("/chat") || pathname.startsWith("/search") || pathname.startsWith("/doc") || pathname.startsWith("/embed")) {
    const backendReq = http.request({
      hostname: BACKEND_HOST,
      port: BACKEND_PORT,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `${BACKEND_HOST}:${BACKEND_PORT}`
      }
    }, (backendRes) => {
      res.writeHead(backendRes.statusCode, backendRes.headers);
      backendRes.pipe(res);
    });

    backendReq.on("error", (err) => {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ 
        error: "Backend Unavailable", 
        message: "Could not connect to Spring Boot backend at http://" + BACKEND_HOST + ":" + BACKEND_PORT,
        details: err.message 
      }));
    });

    req.pipe(backendReq);
    return;
  }

  // 2. Serve Static Assets
  let filePath = path.join(__dirname, pathname === "/" ? "index.html" : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      filePath = path.join(__dirname, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200, { 
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ज्ञान सेतु (Jnana Setu) - IKS Chatbot Frontend`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`  Proxying API calls to Spring Boot: http://${BACKEND_HOST}:${BACKEND_PORT}`);
  console.log(`======================================================\n`);
});
