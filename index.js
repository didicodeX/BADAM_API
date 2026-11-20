import "dotenv/config";
import "./src/config/database.config.js";

import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js";
import { setupSocket } from "./src/socket/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

const server = http.createServer(app);

setupSocket(server, process.env.CLIENT_URL);

// En local ou sur un hébergeur classique (Render, etc.), on écoute sur PORT.
// Sur Vercel, le serveur exporté (HTTP + WebSocket) est servi par une Vercel Function.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
}

export default server;
