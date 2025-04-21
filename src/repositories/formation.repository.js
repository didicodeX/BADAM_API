import { Formation } from "../models/formation.model.js";
import { Session } from "../models/session.model.js";
import { Avis } from "../models/avis.model.js";

export const createFormation = async (data, id) => {
  return await Formation.create({ ...data, formateur: id });
};

export const getAllFormation = async () => {
  return await Formation.find().populate({
    path: "formateur",
    select: "name -_id",
  });
};

export const getFormation = async (id) => {
  return await Formation.findById(id).populate({
    path: "formateur",
    select: "name -_id",
  });
};

export const updateFormation = async (id, data) => {
  return await Formation.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteFormation = async (id) => {
  return await Formation.findByIdAndDelete(id);
};

export const getAvisByFormationId = async (formationId) => {
  // Récupérer les sessions de la formation
  const sessions = await Session.find({ formation: formationId }).select("_id");

  const sessionIds = sessions.map((s) => s._id);

  // Récupérer les avis liés à ces sessions
  return await Avis.find({ sessionFormation: { $in: sessionIds } })
    .populate({
      path: "sessionFormation",
      select: "dateDebut dateFin statut",
    })
    .select("comment rating dateAvis sessionFormation");
};
