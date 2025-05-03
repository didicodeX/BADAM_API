import * as formationService from "../services/formation.service.js";

export const createFormation = async (req, res) => {
  const { id } = req.user;
  try {
    console.log(req.files);
    
    const images = (req.files?.images || []).map(file => file.path); 
    const videos = (req.files?.videos || []).map(file => file.path);


    req.body.images = images; 
    req.body.videos = videos; 
    const formation = await formationService.createFormation(req.body,id);
    res.status(201).json(formation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFormation = async (req, res) => {
  try {
    const formations = await formationService.getAllFormation();
    res.status(201).json(formations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFormation = async (req, res) => {
  try {
    const id = req.params.id;
    const formation = await formationService.getFormation(id);

    if (!formation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }

    res.status(200).json(formation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCreateFormationsByUser = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const formations = await formationService.getFormationsCreateByUser(userId);
    if (!formations) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFormationsByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const formations = await formationService.getFormationsByUser(userId);
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des formations", error });
  }
};




export const updateFormation = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedFormation = await formationService.updateFormation(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedFormation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }

    res.status(200).json(updatedFormation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFormation = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFormation = await formationService.deleteFormation(id);

    if (!deletedFormation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }

    res.status(200).json(deleteFormation, {
      message: "Formation supprimée avec succès",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvisByFormation = async (req, res) => {
  try {
    const formationId = req.params.id;
    const avis = await formationService.getAvisByFormationId(formationId);
    res.status(200).json(avis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
