import * as ChatRepo from "../repositories/chat.repository.js";

export const createChat = async (userIds) => {
    return await ChatRepo.createChat(userIds);
};

