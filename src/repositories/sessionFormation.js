import { SessionFormation } from "../models/sessionFormation.model.js";

export const createSession = async (data) => {
  return await SessionFormation.create(data);
};

export const getAllSessions = async () => {
  return await SessionFormation.find();
};

export const getSession = async (id) => {
  return await SessionFormation.findById(id);
};

export const getSessionsByFormation = async (formationId) => {
  return await SessionFormation.find({ formation: formationId });
};

export const updateSession = async (id, data) => {
  return await SessionFormation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSession = async (id) => {
  return await SessionFormation.findByIdAndDelete(id);
};


