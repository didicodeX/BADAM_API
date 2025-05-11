import * as reviewRepo from "../repositories/review.repository.js";
import * as trainingRepository from "../repositories/training.repository.js";
import { notificationService } from "./notification.service.js";
import * as userRepository from "../repositories/user.repository.js";
import { formatName } from "../utils/formatName.js";

export const createReview = async (data, trainingId, sessionId, userId) => {
  const review = await reviewRepo.createReview(data, trainingId,sessionId, userId);

  const training = await trainingRepository.getTrainingWithInstructorId(
    trainingId
  );
  const reviewer = await userRepository.findById(userId); // ⚠️ à adapter selon ton chemin

  if (!reviewer) {
    throw new Error("Utilisateur introuvable pour la notification");
  }

  const authorId = training.instructor._id;

  await notificationService.createNotification(
    authorId,
    `${formatName(reviewer.name)} a laissé un avis sur ta session "${training.title}".`,
    `/dashboard/sessions/${sessionId}`
  );

  return review;
};

export const getReviewsByTrainingId = async (trainingId) => {
  return await reviewRepo.findByTrainingId(trainingId);
};

export const getAllReview = async () => {
  return await reviewRepo.getAllReview();
};

export const getReview = async (id) => {
  return await reviewRepo.getReview(id);
};

export const getReviewByTraining = async (TrainingId) => {
  return await reviewRepo.getReviewByTraining(TrainingId);
};
export const getReviewByUser = async (userId) => {
  return await reviewRepo.getReviewByUser(userId);
};

export const getReviewBySession = async (sessionId) => {
  return await reviewRepo.getReviewBySession(sessionId);
};

export const updateReview = async (id, data) => {
  return await reviewRepo.updateReview(id, data);
};

export const deleteReview = async (id) => {
  return await reviewRepo.deleteReview(id);
};

export const getReviewTopRatedBYSession = async (id) => {
  return await reviewRepo.findOneById(id);
};

export const getTopRatedTrainings = async () => {
  return await reviewRepo.getTopRatedTrainings();
};

export const getTopRatedSessions = (limit) =>
  reviewRepo.getTopRatedSessions(limit);
