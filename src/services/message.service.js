import * as MessageRepo from "../repositories/message.repository.js";

export const createMessage = async ({ contenuMessage, chatId, expediteurId }) => {
    return await MessageRepo.createMessage({ contenuMessage, chatId, expediteurId });
};

export const getMessagesByChatId = async (chatId) => {
    return await MessageRepo.getMessagesByChatId(chatId);
};