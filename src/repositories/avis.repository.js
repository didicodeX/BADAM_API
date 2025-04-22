import { Avis } from "../models/avis.model.js";
import { Session } from "../models/session.model.js"; 
//import { Formation } from "../models/formation.js";


export const createAvis = async (data, sessionId, userId) => {
  return await Avis.create({
    ...data,
    session: sessionId,
    user: userId,
  });
  
};

export const getAllAvis = async () => {
  return await Avis.find()
  ;
};


export const getAvis = async (id) => {
  return await Avis.findById(id);
};


export const getAvisByUser = async (userId) => {
  return await Avis.find({ user: userId });
};

export const getAvisByFormation = async (formationId) => {
  const sessions = await Session.find({ formation: formationId }, { _id: 1 });
  const sessionIds = sessions.map(s => s._id);

  return await Avis.find({ session: { $in: sessionIds } })
    .populate("user", "nom prenom") // Optionnel : pour voir l’auteur
    .populate("session", "dateDebut dateFin"); // Optionnel : pour avoir les dates de session
};


export const getAvisBySession = async (sessionId) => {
  return await Avis.find({ session: sessionId });
};

export const updateAvis = async (id, data) => {
  return await Avis.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAvis = async (id) => {
  return await Avis.findByIdAndDelete(id);

};




export const getTopRatedFormations = async () => {
  const result = await Avis.aggregate([
    {
      $lookup: {
        from: "sessions", // doit correspondre au nom MongoDB réel
        localField: "session",
        foreignField: "_id",
        as: "session",
      },
    },
    { $unwind: "$session" },
    {
      $lookup: {
        from: "formations",
        localField: "session.formation",
        foreignField: "_id",
        as: "formation",
      },
    },
    { $unwind: "$formation" },
    {
      $group: {
        _id: "$formation._id",
        formation: { $first: "$formation" },
        averageNote: { $avg: "$note" },
        totalAvis: { $sum: 1 },
      },
    },
    { $sort: { averageNote: -1 } },
    { $limit: 5 },
  ]);

  return result;
};



export const getTopRatedSessions = async (limit = 5) => {
  return await Avis.aggregate([
    {
      $group: {
        _id: "$session",
        moyenneNote: { $avg: "$rating" },
        totalAvis: { $sum: 1 }
      }
    },
    { $sort: { moyenneNote: -1, totalAvis: -1 } },
    { $limit: parseInt(limit) },
    {
      $lookup: {
        from: "sessions",
        localField: "_id",
        foreignField: "_id",
        as: "session"
      }
    },
    { $unwind: "$session" },
    {
      $lookup: {
        from: "formations",
        localField: "session.formation",
        foreignField: "_id",
        as: "formation"
      }
    },
    { $unwind: "$formation" },
    {
      $project: {
        _id: 1,
        moyenneNote: 1,
        totalAvis: 1,
        dateDebut: "$session.dateDebut",
        dateFin: "$session.dateFin",
        formationTitre: "$formation.titre"
      }
    }
  ]);
};
