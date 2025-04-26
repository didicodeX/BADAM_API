import { Message } from "../models/message.model.js";

export const createMessage = async ({ contenuMessage, chatId, expediteurId }) => {
    try {
        const newMessage = new Message({
            contenuMessage,
            chat: chatId,
            expediteur: expediteurId,
        });

        return await newMessage.save();
    } catch (err) {
        throw new Error("Erreur lors de la création du message : " + err.message);
    }
};

export const getMessagesByChat = async (chatId) => {
    return await Message.find({ chat: chatId })
        .sort({ date: 1 }) 
        .populate("expediteur", "name email"); 
};