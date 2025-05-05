import * as registrationRepo from "../repositories/registration.repository.js";
import { createNotification } from "./notification.service.js";

import { Session } from "../models/session.model.js";

export const createRegistration = async (sessionId,participantId, io) => {
  if (!participantId || !sessionId) {
    throw new Error("participantId et sessionId sont requis.");
  }

  const registration =  await registrationRepo.createRegistration({
    session: sessionId,
    participant: participantId,
  });

  // const session = await Session.findById(registration.session).populate("training");
  // const instructorId = session.training.instructor;
  // const trainingTitre = session.training.titre;

  // // Créer une notification
  // const notification = await createNotification(
  //   instructorId,
  //   `Nouvelle inscription pour votre session "${trainingTitre}"`
  // );

  // // Notifier en temps réel
  // io.to(`instructor_${instructorId}`).emit(
  //   "nouvelle-notification",
  //   notification
  // );

  // // Rafraîchir la liste des inscriptions pour ce instructor
  // io.to(`instructor_${instructorId}`).emit("mise-a-jour-inscriptions");

  return registration;
};

export const getRegistrations = async () => {
  return await registrationRepo.getRegistrations();
};

export const getRegistrationsByUserId = async (userId) => {
  return await registrationRepo.getRegistrationsByUserId(userId);
};

export const getRegistrationsBySessionId = async (sessionId) => {
  return await registrationRepo.getRegistrationsBySessionId(sessionId);
};

export const deleteRegistration = async (userId, sessionId) => {
  console.log("Session ID reçu :", sessionId);

  const registration = await registrationRepo.getRegistrationByUserAndSession(
    userId,
    sessionId
  );

  if (!registration) {
    throw new Error("Inscription non trouvée");
  }

  await registrationRepo.deleteRegistration(registration._id);
};
