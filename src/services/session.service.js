import * as sessionRepo from "../repositories/session.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";
import * as registrationRepo from "../repositories/registration.repository.js";
import { Wishlist } from "../models/wishlist.model.js";
import { Session } from "../models/session.model.js";
import { Registration } from "../models/registration.model.js";
import { notificationService } from "./notification.service.js";

export const createSession = async (data, userId, trainingId) => {
  const newSession = await sessionRepo.createSession(data, userId, trainingId);
  await newSession.populate("training", "title");

  const expiredSessions = await Session.find({
    training: newSession.training._id,
    endDateTime: { $lt: new Date() },
  }).select("_id");

  const expiredSessionIds = expiredSessions.map((s) => s._id);
  const wishlists = await Wishlist.find({
    session: { $in: expiredSessionIds },
  });
  await Wishlist.deleteMany({ session: { $in: expiredSessionIds } });

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(newSession.startDateTime));

  const message = `Bonne nouvelle ! Une nouvelle session est disponible pour la formation "${newSession.training.title}". Elle aura lieu le ${formattedDate} à ${newSession.address}.`;

  for (const wish of wishlists) {
    await notificationService.createNotification(
      wish.user,
      message,
      `/sessions/${newSession._id}`
    );
  }

  return newSession;
};

export const getAllSessions = async () => {
  return await sessionRepo.getSessionsWithParticipantCount();
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

// export const deleteSession = async (id) => {
//   return await sessionRepo.deleteSession(id);
// };

export const deleteSession = async (sessionId, userId) => {
  const session = await Session.findById(sessionId).populate("training", "title");

  if (!session) throw new Error("Session introuvable");
  if (session.createdBy.toString() !== userId.toString()) {
    throw new Error("Non autorisé à supprimer cette session");
  }

  // 1. Récupérer tous les participants et les wishlists
  const registrations = await Registration.find({ session: sessionId }).populate("participant", "name");
  const wishlists = await Wishlist.find({ session: sessionId });

  // 2. Supprimer session, inscriptions et wishlist
  await Session.findByIdAndDelete(sessionId);
  await Registration.deleteMany({ session: sessionId });
  await Wishlist.deleteMany({ session: sessionId });

  // 3. Construire le message
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(session.startDateTime));

  const message = `La session "${session.training.title}" prévue le ${formattedDate} à ${session.address} a été annulée.`;

  // 4. Notifier les participants
  for (const reg of registrations) {
    await notificationService.createNotification(
      reg.participant._id,
      message,
      `/formations/${session.training._id}`
    );
  }

  // 5. Notifier les wishlisteurs (si différents)
  for (const wish of wishlists) {
    // éviter doublon si le participant est déjà notifié
    if (!registrations.some((r) => r.participant._id.toString() === wish.user.toString())) {
      await notificationService.createNotification(
        wish.user,
        message,
        `/formations/${session.training._id}`
      );
    }
  }

  return { message: "Session supprimée avec succès" };
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
  const session = await sessionRepo.findSessionWithTrainingAndParticipants(
    sessionId
  );
  const registrations = await registrationRepo.findRegistrationsForSession(
    sessionId
  );
  const reviews = await reviewRepo.findReviewsForTraining(session.training._id);
  const ratingStats = await reviewRepo.getTrainingRatingStats(
    session.training._id
  );

  return {
    session,
    registrations,
    reviews,
    ratingStats,
  };
};

export const getSessionDetailsPublic = async (sessionId) => {
  const session = await sessionRepo.findSessionWithInstructor(sessionId);
  const reviews = await reviewRepo.findReviewsForTraining(session.training._id);
  const ratingStats = await reviewRepo.getTrainingRatingStats(
    session.training._id
  );

  return { session, reviews, ratingStats };
};

export const getTopRatedSessions = async () => {
  return await sessionRepo.getTopRatedSessions();
};

export const getLatestSessions = async () => {
  return await sessionRepo.getLatestSessions();
};
