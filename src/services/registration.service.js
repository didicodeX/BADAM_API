import * as RegistrationRepo from "../repositories/registration.repository.js"
import * as SessionRepo from "../repositories/session.repository.js"

import { createNotification } from "./notification.service.js";

import { Session } from "../models/session.model.js";

export const createRegistration = async (data, io) => {
  const registration = await RegistrationRepo.createRegistration(data);

  const session = await Session.findById(data.session).populate("formation");
  const formateurId = session.formation.formateur;
  const formationTitre = session.formation.titre;

  // Créer une notification
  const notification = await createNotification(formateurId, `Nouvelle inscription pour votre formation "${formationTitre}"`);

  // Notifier en temps réel
  io.to(`formateur_${formateurId}`).emit("nouvelle-notification", notification);

  // Rafraîchir la liste des inscriptions pour ce formateur
  io.to(`formateur_${formateurId}`).emit("mise-a-jour-inscriptions");

  return registration;
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


