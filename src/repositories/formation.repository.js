import { Formation } from "../models/formation.model.js";
import { Session } from "../models/session.model.js";
import { Avis } from "../models/avis.model.js";
import { Registration } from "../models/registration.model.js";

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

export const getFormationsCreateByUser = async (userId) => {
  return await Formation.find({ formateur: userId }).populate("formateur" ,"name" );
};

export const getFormationsByUser = async (userId) => {
  return await Registration.find({ user: userId })
    .populate({
      path: "session",
      populate: {
        path: "formation",
        populate: {
          path: "formateur",
          select: "name", 
        },
      },
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
  const sessions = await Session.find({ formation: formationId }).select("_id");
  console.log("Sessions trouvées:", sessions);

  const sessionIds = sessions.map((s) => s._id);
  const avis = await Avis.find({ session: { $in: sessionIds } })
    .populate({
      path: "session",
      select: "dateDebut dateFin statut",
    })
    .select("comment rating dateAvis session");

  
};
