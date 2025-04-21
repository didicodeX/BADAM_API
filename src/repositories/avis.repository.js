import { Avis } from "../models/avis.model.js";


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


export const getSAvisByFormation = async (formationId) => {
  return await Avis.find({ formation: formationId });
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







export const getAvisTopRatedBYSession = async (id) => {
  return await Avis.findOneById(id);
};




export const getTopRatedFormations = async (limit = 5) => {
  return await Avis.aggregate([
    {
      $lookup: {
        from: "sessionformations",
        localField: "sessionFormation",
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
      $group: {
        _id: "$formation._id",
        titre: { $first: "$formation.titre" },
        moyenneNote: { $avg: "$rating" },
        totalAvis: { $sum: 1 }
      }
    },
    { $sort: { moyenneNote: -1, totalAvis: -1 } },
    { $limit: parseInt(limit) }
  ]);
};

export const getTopRatedSessions = async (limit = 5) => {
  return await Avis.aggregate([
    {
      $group: {
        _id: "$sessionFormation",
        moyenneNote: { $avg: "$rating" },
        totalAvis: { $sum: 1 }
      }
    },
    {
      $sort: { moyenneNote: -1, totalAvis: -1 }
    },
    { $limit: parseInt(limit) },
    {
      $lookup: {
        from: "sessionformations",
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
