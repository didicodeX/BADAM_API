import * as avisService from "../services/avis.service.js";



export const createAvis = async (req, res) => {
  const { id: userId } = req.user;
  const { sessionId } = req.params;

  try {
    const avis = await avisService.createAvis(req.body, sessionId, userId);
    res.status(201).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllAvis = async (req, res) => {
  try {
    const avis = await avisService.getAllAvis();
    res.json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvis = async (req, res) => {
  try {
    const id = req.params.id;
    const avis = await avisService.getAvis(id);

    if (!avis) {
      return res.status(404).json({ message: "avis non trouvée" });
    }

    res.status(200).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvisByFormation = async (req, res) => {
  try {
    const id = req.params.formationId;
    const avis = await avisService.getAvisByFormation(id);

    if (!avis) {
      return res.status(404).json({ message: "avis non trouvée" });
    }

    res.status(200).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAvisByUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const avis = await avisService.getAvisByUser(id);

    if (!avis) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvisBySession = async (req, res) => {
  try {
    const id = req.params.sessionId;
    const avis = await avisService.getAvisBySession(id);

    if (!avis) {
      return res.status(404).json({ message: "avis non trouvée" });
    }

    res.status(200).json(avis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAvis = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedAvis = await avisService.updateAvis(id, updatedData, {
      new: true,
    });

    if (!updatedAvis) {
      return res.status(404).json({ message: "avis non trouvée" });
    }

    res.status(200).json(updatedAvis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAvis = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAvis = await avisService.deleteAvis(id);

    if (!deletedAvis) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res
      .status(200)
      .json(deleteAvis, { message: "Avis supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const getAvisTopRatedBYSession = async (id) => {
  return await Session.findOneById(id);
};

export const getTopRatedFormations = async (req, res) => {
  try {
    const topFormations = await avisService.getTopRatedFormations();
    res.status(200).json(topFormations);
  } catch (error) {
    console.error("Erreur complète :", error); // <--- très important pour debugger
    res.status(500).json({ error: error.message }); // renvoie le message réel
  }
};


export const getTopRatedSessions = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const sessions = await avisService.getTopRatedSessions(limit);
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
