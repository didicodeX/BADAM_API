import * as formationService from "../services/formation.service.js";

export const createFormation = async (req, res) => {
  try {
    const formation = await formationService.createFormation(req.body);
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

export const deleteFormation= async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFormation = await formationService.deleteFormation(id);

    if (!deletedFormation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }

    res
      .status(200)
      .json(deleteFormation, {
        message: "Formation supprimée avec succès",
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
