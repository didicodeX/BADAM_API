import { Server } from "socket.io";
import registerSocketEvents from "./event.js";

export let io = null;

export const setupSocket = (server, CLIENT_URL) => {
  io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Utilisateur connecté :", socket.id);

    // 🎯 Le client peut joindre sa room privée
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`🔔 Socket ${socket.id} a rejoint la room user ${userId}`);
    });

    registerSocketEvents(socket, io);
  });
};
