import * as ChatServices from "../services/chat.service.js"
import * as SessionService from "../services/session.service.js";

export const createChat = async (req, res) => {
    const { id: userId } = req.user;
    const { sessionId } = req.params;

    try {
        const session = await SessionService.getSession(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session introuvable" });
        }

        const formateurId = session.formation?.formateur;

        if (!formateurId) {
            return res.status(404).json({ message: "Formateur non trouvé pour cette session" });
        }

        const chat = await ChatServices.createChat([userId, formateurId]);

        res.status(201).json(chat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

