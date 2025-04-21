import { Session } from "../models/session.model.js";
import { Avis } from "../models/avis.model.js";

export const createSession = async (data,id) => {
  return await Session.create({ ...data, formation: id });
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

export const updateSession = async (id, data) => {
  return await Session.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSession = async (id) => {
  return await Session.findByIdAndDelete(id);
};




export const getAvisBySessionId = async (sessionId) => {
  return await Avis.find({ sessionFormation: sessionId })
    .select("comment rating dateAvis")
    .sort({ dateAvis: -1 }); // tri du plus récent au plus ancien
};



