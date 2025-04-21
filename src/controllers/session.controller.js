import * as sessionService from "../services/session.service.js";

export const createSession = async (req, res) => {
  const { id } = req.user;
  try {
    const session = await sessionService.createSession(req.body,id);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const id = req.params.id;
    const session = await sessionService.getSession(id);

    if (!session) {
      return res.status(404).json({ message: "session non trouvée" });
    }

    res.status(200).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSessionsByFormation = async (req, res) => {
  try {
    const id = req.params.formationId;
    const sessions = await sessionService.getSessionsByFormation(id);

    if (!sessions) {
      return res.status(404).json({ message: "session non trouvée" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedSession = await sessionService.updateSession(id, updatedData, {
      new: true,
    });

    if (!updatedSession) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    res.status(200).json(updatedSession);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSession = await sessionService.deleteSession(id);

    if (!deletedSession) {
      return res.status(404).json({ message: "session non trouvée" });
    }

    res
      .status(200)
      .json(deleteSession, { message: "session supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAvisBySessionId = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const avis = await sessionService.getAvisBySessionId(sessionId);
    res.json(avis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};