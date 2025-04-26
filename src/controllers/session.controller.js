import * as sessionService from "../services/session.service.js";

export const createSession = async (req, res) => {
  const { id } = req.user;
  const {formationId}=req.params;

 
  try {
    const session = await sessionService.createSession(req.body,id,formationId);
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });

  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    return res.status(200).json(sessions);
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

export const getSessionsByUser = async (req, res) => {
  const userId = req.params.userId;
  

  try {
    const sessions = await sessionService.getSessionsByUser(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des sessions", error });
  }
};


export const getSessionsByFormationTitle = async (req, res) => {
  try {
    const query = req.query.query ;

    console.log(query)
    console.log("Query reçu (req.query):", query);
    console.log("Params reçus (req.params):", req.params);
    const sessions = await sessionService.getSessionsByFormationTitle(query);
    

    if (!sessions) {
      return res.status(404).json({ message: "session non trouvée" });
    }
    res.status(200).json(sessions);


  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
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
