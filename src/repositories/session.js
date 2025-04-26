import { Session } from "../models/session.model.js";
import { Avis } from "../models/avis.model.js";
import { Registration } from "../models/registration.model.js";

export const createSession = async (data,userId,formationId) => {
  return await Session.create({ ...data, user:userId,formation: formationId });
};

export const getAllSessions = async () => {
  return await Session.find();
};

export const getSession = async (id) => {
  return await Session.findById(id);
};


export const getSessionsByFormation = async (formationId) => {
  return await Session.find({ formation: formationId });
};

export const getSessionsByUser = async (userId) => {
  return await Registration.find({ user: userId }).populate("session");
};

export const getSessionsByFormationTitle = async (searchText) => {
  return  await Session.find()
    .populate({
      path: "formation",
      match: { titre: { $regex: searchText, $options: "i" } },
    })
    .then((sessions) => sessions.filter((s) => s.formation)); 
};


export const updateSession = async (id, data) => {
  return await Session.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSession = async (id) => {
  return await Session.findByIdAndDelete(id);
};




export const getAvisBySessionId = async (sessionId) => {
  return await Avis.find({ session: sessionId })
    .select("comment rating dateAvis")
    .sort({ dateAvis: -1 }); // tri du plus récent au plus ancien
};



