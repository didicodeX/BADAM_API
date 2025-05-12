import "dotenv/config";
import "./src/config/database.config.js";

import http from "http";
import app from "./app.js";
import { setupSocket } from "./src/socket/index.js";

const PORT = process.env.PORT;
const server = http.createServer(app);

setupSocket(server, process.env.CLIENT_URL);

server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
