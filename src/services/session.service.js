import * as sessionRepo from "../repositories/session.repository.js";

export const createSession = async (data, userId, TrainingId) => {
  return await sessionRepo.createSession(data, userId, TrainingId);
};

export const getAllSessions = async () => {
  return await sessionRepo.getAllSessions();
};

export const getSession = async (id) => {
  return await sessionRepo.getSession(id);
};

export const getSessionsByTraining = async (TrainingId) => {
  return await sessionRepo.getSessionsByTraining(TrainingId);
};

// services/session.service.js
export const getSessionsByUser = async (userId) => {
  const registrations = await sessionRepo.getSessionsByUser(userId);

  // Extraire uniquement les sessions depuis les inscriptions
  return registrations.map((reg) => reg.session);
};

export const getSessionsByTrainingTitle = async (data) => {
  return await sessionRepo.getSessionsByTrainingTitle(data);
};

export const updateSession = async (id, data) => {
  return await sessionRepo.updateSession(id, data);
};

export const deleteSession = async (id) => {
  return await sessionRepo.deleteSession(id);
};

export const getReviewBySessionId = async (sessionId) => {
  return await sessionRepo.getReviewBySessionId(sessionId);
};

export const listSessionsWithCount = async () => {
  return await sessionRepo.getSessionsWithParticipantCount();
};