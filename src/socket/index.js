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
    registerSocketEvents(socket, io);
  });
};
