import * as sessionRepo from "../repositories/session.repository.js";

export const createSession = async (data,userId,formationId) => {
  return await sessionRepo.createSession(data,userId,formationId);
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

export const updateSession = async (id, data) => {
  return await sessionRepo.updateSession(id, data);
};

export const deleteSession = async (id) => {
  return await sessionRepo.deleteSession(id);
};

export const getAvisBySessionId = async (sessionId) => {
  return await sessionRepo.getAvisBySessionId(sessionId);
};