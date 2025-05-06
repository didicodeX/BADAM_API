import * as sessionRepo from "../repositories/session.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";
import * as registrationRepo from "../repositories/registration.repository.js";

export const createSession = async (data, userId, trainingId) => {
  return await sessionRepo.createSession(data, userId, trainingId);
};

export const getAllSessions = async () => {
  return await sessionRepo.getAllSessions();
};

export const getMySessions = async (userId) => {
  return await sessionRepo.findSessionsByCreator(userId);
};

export const getSession = async (id) => {
  return await sessionRepo.getSession(id);
};

export const getSessionsByTraining = async (trainingId) => {
  return await sessionRepo.getSessionsByTraining(trainingId);
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

export const listMySessionsWithRegistrations = async (userId) => {
  return await sessionRepo.getMySessionsWithRegistrations(userId);
};

export const getSessionDetails = async (sessionId) => {
  const session = await sessionRepo.findSessionWithTraining(sessionId);
  const registrations = await registrationRepo.findRegistrationsForSession(
    sessionId
  );
  const reviews = await reviewRepo.findReviewsForSession(sessionId);

  return { session, registrations, reviews };
};

export const getSessionDetailsPublic = async (sessionId) => {
  const session = await sessionRepo.findSessionWithInstructor(sessionId);
  const reviews = await reviewRepo.findReviewsForSession(sessionId);

  return { session, reviews };
};
