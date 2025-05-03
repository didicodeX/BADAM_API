import * as registrationRepo from "../repositories/registration.repository.js";
import { createNotification } from "./notification.service.js";

import { Session } from "../models/session.model.js";

export const createRegistration = async (data, io) => {
  const registration = await registrationRepo.createRegistration(data);

  const session = await Session.findById(data.session).populate("Training");
  const instructorId = session.training.instructor;
  const TrainingTitre = session.training.titre;

  // Créer une notification
  const notification = await createNotification(
    instructorId,
    `Nouvelle inscription pour votre Training "${TrainingTitre}"`
  );

  // Notifier en temps réel
  io.to(`instructor_${instructorId}`).emit(
    "nouvelle-notification",
    notification
  );

  // Rafraîchir la liste des inscriptions pour ce instructor
  io.to(`instructor_${instructorId}`).emit("mise-a-jour-inscriptions");

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
