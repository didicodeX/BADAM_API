import * as registrationRepo from "../repositories/registration.repository.js";
import * as trainingRepo from "../repositories/training.repository.js";
import { notificationService } from "../services/notification.service.js";
import * as sessionRepo from "../repositories/session.repository.js";
import * as userRepo from "../repositories/user.repository.js";

import { Session } from "../models/session.model.js";

export const createRegistration = async (sessionId, participantId) => {
  if (!participantId || !sessionId) {
    throw new Error("participantId et sessionId sont requis.");
  }

  // Étape 1 - Créer l'inscription
  const registration = await registrationRepo.createRegistration({
    session: sessionId,
    participant: participantId,
  });

  // Étape 2 - Récupérer la session avec son training
  const session = await sessionRepo.getSessionWithTraining(sessionId);
  console.log("Session récupérée :", session);
  if (!session) {
    throw new Error("Session non trouvée");
  }

  // Étape 3 - Récupérer le training avec l’instructeur
  const training = await trainingRepo.getTrainingWithInstructorId(
    session.training
  );
  console.log("Formation récupérée :", training);
  if (!training) {
    throw new Error("Formation non trouvée");
  }

  const instructorId = training.instructor._id;
  console.log("Instructeur ID :", instructorId);
  if (!instructorId) {
    throw new Error("Instructeur non trouvé");
  }

  // Étape 4 - Récupérer le nom du participant (optionnel si déjà connu)
  const participant = await userRepo.findById(participantId); // ou passé en paramètre
  console.log("Participant récupéré :", participant);
  if (!participant) {
    throw new Error("Participant non trouvé");
  }

  // Étape 5 - Ne pas notifier soi-même
  if (participantId !== instructorId.toString()) {
    await notificationService.createNotification(
      instructorId,
      `${participant.name} s'est inscrit à ta session "${training.title}".`,
      `/sessions/${sessionId}`
    );
  }

  const notif = await notificationService.createNotification(
  instructorId,
  `${participant.name} s'est inscrit à ta session "${training.title}".`,
  `/sessions/${sessionId}`
);

console.log("✅ Notification envoyée et enregistrée :", notif);


  return registration;
};

export const getRegistrations = async () => {
  return await registrationRepo.getRegistrations();
};

export const getRegistrationsByUserId = async (userId) => {
  return await registrationRepo.getRegistrationsByUserId(userId);
};

export const getRegistrationsBySessionId = async (sessionId) => {
  console.log("Session ID reçu :", sessionId);
  return await registrationRepo.findRegistrationsForSession(sessionId);
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
