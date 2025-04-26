import { Chat } from "../models/chat.model.js";

export const createChat = async (userIds) => {
    try {
      const existingChat = await Chat.findOne({
        user: { $all: userIds },
      });
  
      if (existingChat) {
        return existingChat;  
      }

      const newChat = new Chat({
        user: userIds,
      });
      return await newChat.save();  
      
    } catch (err) {
      throw new Error("Erreur lors de la création du chat: " + err.message);
    }
  };

