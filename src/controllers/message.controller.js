import * as MessageService from "../services/message.service.js";

export const createMessage = async (req, res) => {
  const { id: expediteurId } = req.user;
  const { chatId } = req.params;
  const { contenuMessage } = req.body;

  try {
    const message = await MessageService.createMessage({
      contenuMessage,
      chatId,
      expediteurId,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
