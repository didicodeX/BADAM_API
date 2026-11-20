import "dotenv/config";
import "./src/config/database.config.js";

import http from "http";
import app from "./src/express-app.js";
import { setupSocket } from "./src/socket/index.js";

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
