import * as RegistrationRepo from "../repositories/registration.repository.js"
import * as SessionRepo from "../repositories/session.repository.js"

export const createRegistration = async ({ userId, sessionId }) => {
  const session = await SessionRepo.getSession(sessionId);
  if (!session) {
    throw new Error("Session introuvable");
  }

  if (session.nbParticipants >= session.maxParticipant) {
    session.statut = "Expirée";
    await session.save();
    throw new Error("La session est complète");
  }

  session.nbParticipants += 1;

  if (session.nbParticipants >= session.maxParticipant) {
    session.statut = "Expirée";
  }

  await session.save();

  return await RegistrationRepo.createRegistration({ user: userId, session: sessionId });
};

export const getRegistrations = async () => {
  return await RegistrationRepo.getRegistrations();
};

export const getRegistrationsByUserId = async (userId) => {
  return await RegistrationRepo.getRegistrationsByUserId(userId);
};

export const getRegistrationsBySessionId = async (sessionId) => {
  return await RegistrationRepo.getRegistrationsBySessionId(sessionId);
};


export const deleteRegistration = async (userId, sessionId) => {
  
  console.log("Session ID reçu :", sessionId);

  const registration = await RegistrationRepo.getRegistrationByUserAndSession(userId, sessionId);

  if (!registration) {
    throw new Error("Inscription non trouvée");
  }
  
  const session = await SessionRepo.getSession(sessionId);
  if (!session) {
    throw new Error("Session non trouvée");
  }

  session.nbParticipants = Math.max(0, session.nbParticipants - 1); 

  
  if (session.nbParticipants < session.maxParticipant) {
    session.statut = "Disponible";
  }

  await session.save();

  await RegistrationRepo.deleteRegistration(registration._id);
};


