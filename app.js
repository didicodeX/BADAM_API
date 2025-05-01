import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import routes from "./src/routes/index.js";
import { isProd } from "./src/config/cookie.config.js";

const app = express();

const client = isProd ? process.env.CLIENT_URL : "http://localhost:5173";
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [client];

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// Création du serveur HTTP
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
credentials: true
  },
});

app.set("io", io);
// D'abord, définis les routes HTTP
app.post('/registrations/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  console.log(`Création d'une inscription pour l'utilisateur ${id}`);
  console.log(`Infos reçues :`, { name, email });
  
  res.status(201).json({
    message: 'Inscription réussie',
    userId: id,
    data: { name, email }
  });
});
io.on("connection", (socket) => {
  console.log("✅ Un utilisateur est connecté :", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`🟢 Socket ${socket.id} a rejoint le chat ${chatId}`);
  });



  socket.on("join-formateur-room", (formateurId) => {
    const roomName = `formateur_${formateurId}`;
    socket.join(roomName);
    console.log(`📚 Formateur ${formateurId} rejoint sa salle privée avec socket ${socket.id}`);

    // Notifier la salle du formateur
    io.to(roomName).emit("nouvelle-notification", {
      message: "Un nouvel élève s'est inscrit ! 🎉"
    });

    io.to(roomName).emit("mise-a-jour-inscriptions");

    // Test automatique : notification après 5 secondes
    setTimeout(() => {
      io.to(roomName).emit("nouvelle-notification", {
        message: "🚀 Test de notification automatique !"
      });

      io.to(roomName).emit("mise-a-jour-inscriptions");
    }, 5000);
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
