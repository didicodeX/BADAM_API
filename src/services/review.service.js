import * as reviewRepo from "../repositories/review.repository.js";

export const createReview = async (data, trainingId, userId) => {
  return await reviewRepo.createReview(data, trainingId, userId);
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
