import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(__dirname, "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@richajha.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "richa2026";
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  crypto.createHash("sha256").update(`portfolio-session-${__dirname}`).digest("hex");

const COOKIE_NAME = "rj_admin_session";

function signToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

function verifyToken(token: string | undefined): { email: string } | null {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!parsed.email || (parsed.exp && Date.now() > parsed.exp)) return null;
    return { email: parsed.email };
  } catch {
    return null;
  }
}

function readStoredContent(): { content: unknown; updated_at?: string } {
  if (!fs.existsSync(CONTENT_FILE)) {
    return { content: null };
  }
  try {
    return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
  } catch {
    return { content: null };
  }
}

function writeStoredContent(content: unknown) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const payload = {
    content,
    updated_at: new Date().toISOString(),
  };
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  app.use(express.json({ limit: "15mb" }));
  app.use(cookieParser());

  app.get("/api/content", (_req, res) => {
    const stored = readStoredContent();
    res.json(stored);
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body ?? {};
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() ||
      password !== ADMIN_PASSWORD
    ) {
      return res.status(401).json({ detail: "Invalid email or password" });
    }
    const token = signToken(ADMIN_EMAIL);
    const isHttps =
      req.secure || req.headers["x-forwarded-proto"] === "https";
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: isHttps ? "none" : "lax",
      secure: isHttps,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });
    return res.json({ email: ADMIN_EMAIL });
  });

  app.get("/api/auth/me", (req, res) => {
    const user = verifyToken(req.cookies?.[COOKIE_NAME]);
    if (!user) {
      return res.status(401).json({ detail: "Not authenticated" });
    }
    return res.json(user);
  });

  app.post("/api/auth/logout", (req, res) => {
    const isHttps =
      req.secure || req.headers["x-forwarded-proto"] === "https";
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: isHttps ? "none" : "lax",
      secure: isHttps,
      path: "/",
    });
    return res.json({ ok: true });
  });

  app.put("/api/content", (req, res) => {
    const user = verifyToken(req.cookies?.[COOKIE_NAME]);
    if (!user) {
      return res.status(401).json({ detail: "Authentication required" });
    }
    const { content } = req.body ?? {};
    if (!content || typeof content !== "object") {
      return res.status(400).json({ detail: "Invalid content payload" });
    }
    const saved = writeStoredContent(content);
    return res.json(saved);
  });

  const isProd =
    process.env.NODE_ENV === "production" ||
    process.env.npm_lifecycle_event === "start";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
