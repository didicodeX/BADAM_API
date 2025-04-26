import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import routes from "./src/routes/index.js";
import { Server } from "socket.io";

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

// Création du serveur HTTP
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Liste des sockets connectés
io.on("connection", (socket) => {
  console.log("✅ Un utilisateur est connecté :", socket.id);

  // Rejoint une salle correspondant à un chat spécifique
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`🟢 Socket ${socket.id} a rejoint le chat ${chatId}`);
  });

  // Réception et rediffusion d’un message
  socket.on("sendMessage", (messageData) => {
    const { chatId, senderId, content } = messageData;

    // Sauvegarde en BDD à faire ici (dans ton contrôleur/service)

    // Envoie à tous les sockets dans la même salle
    io.to(chatId).emit("receiveMessage", {
      senderId,
      content,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("🔌 Utilisateur déconnecté :", socket.id);
  });
});

export { server };
export default app;
