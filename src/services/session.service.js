import * as sessionRepo from "../repositories/sessionFormation.js";

export const createSession = async (data) => {
  return await sessionRepo.createSession(data);
};

export const getAllSessions = async () => {
  return await sessionRepo.getAllSessions();
};

export const getSession = async (id) => {
  return await sessionRepo.getSession(id);
};

export const getSessionsByFormation = async (formationId) => {
  return await sessionRepo.getSessionsByFormation(formationId);
};

export const updateFormation = async (id, data) => {
  return await sessionRepo.updateSession(id, data);
};

export const deleteSession = async (id) => {
  return await sessionRepo.deleteSession(id);
};
