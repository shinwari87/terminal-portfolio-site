import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const base = await realpath(fileURLToPath(new URL("./public/", import.meta.url)));
const host = "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"]
]);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error("PORT must be a whole number between 0 and 65535.");
  process.exit(1);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let route;
  try {
    route = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  try {
    const path = await realpath(join(base, route === "/" ? "index.html" : route));
    const fromBase = relative(base, path);
    if (fromBase === ".." || fromBase.startsWith(".." + sep)) {
      response.writeHead(404).end();
      return;
    }
    const info = await stat(path);
    if (!info.isFile()) {
      response.writeHead(404).end();
      return;
    }
    const content = request.method === "HEAD" ? undefined : await readFile(path);
    response.writeHead(200, {
      "Content-Type": mimeTypes.get(extname(path)) || "application/octet-stream",
      "Content-Length": info.size,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store"
    });
    response.end(content);
  } catch {
    response.writeHead(404).end();
  }
});

server.on("error", error => {
  console.error(`Could not start the local preview: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Portfolio preview: http://${host}:${server.address().port}/`);
});
