import { Session } from "../models/session.model.js";

export const createSession = async (data) => {
  return await Session.create(data);
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


