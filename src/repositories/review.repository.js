import { Review } from "../models/review.model.js";
import { Session } from "../models/session.model.js";
import mongoose from "mongoose";
//import { Training } from "../models/training.js";

export const createReview = async (data, trainingId, userId) => {
  return await Review.create({
    ...data,
    training: trainingId,
    author: userId,
  });
};

export const getAllReview = async () => {
  return await Review.find();
};

export const getReview = async (id) => {
  return await Review.findById(id);
};

export const getReviewByUser = async (userId) => {
  return await Review.find({ user: userId });
};

export const getReviewByTraining = async (trainingId) => {
  const sessions = await Session.find({ training: trainingId }, { _id: 1 });
  const sessionIds = sessions.map((s) => s._id);

  return await Review.find({ session: { $in: sessionIds } })
    .populate("user", "nom prenom") // Optionnel : pour voir l’auteur
    .populate("session", "startDateTime endDateTime"); // Optionnel : pour avoir les dates de session
};

export const getReviewBySession = async (sessionId) => {
  return await Review.find({ session: sessionId });
};

export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

export const getTopRatedTrainings = async () => {
  const result = await Review.aggregate([
    {
      $lookup: {
        from: "sessions", // doit correspondre au nom MongoDB réel
        localField: "session",
        foreignField: "_id",
        as: "session",
      },
    },
    { $unwind: "$session" },
    {
      $lookup: {
        from: "trainings",
        localField: "session.training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $group: {
        _id: "$training._id",
        training: { $first: "$training" },
        averageNote: { $avg: "$note" },
        totalReview: { $sum: 1 },
      },
    },
    { $sort: { averageNote: -1 } },
    { $limit: 5 },
  ]);

  return result;
};

export const getTopRatedSessions = async (limit = 5) => {
  return await Review.aggregate([
    {
      $group: {
        _id: "$session",
        moyenneNote: { $avg: "$rating" },
        totalReview: { $sum: 1 },
      },
    },
    { $sort: { moyenneNote: -1, totalReview: -1 } },
    { $limit: parseInt(limit) },
    {
      $lookup: {
        from: "sessions",
        localField: "_id",
        foreignField: "_id",
        as: "session",
      },
    },
    { $unwind: "$session" },
    {
      $lookup: {
        from: "trainings",
        localField: "session.training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $project: {
        _id: 1,
        moyenneNote: 1,
        totalReview: 1,
        dateDebut: "$session.dateDebut",
        dateFin: "$session.dateFin",
        TrainingTitre: "$training.titre",
      },
    },
  ]);
};

export const findReviewsForSession = (sessionId) => {
  return Review.find({ session: sessionId })
    .select("comment rating createdAt")
    .populate("author", "name");
};

export const findReviewsForTraining = (trainingId) => {
  return Review.find({ training: trainingId })
    .select("comment rating createdAt")
    .populate("author", "name");
};

// reviewRepo.js
export const getTrainingRatingStats = async (trainingId) => {
  const stats = await Review.aggregate([
    {
      $match: {
        training: new mongoose.Types.ObjectId(trainingId),
      },
    },
    {
      $group: {
        _id: "$training",
        average: { $avg: "$rating" },
        total: { $sum: 1 },
      },
    },
  ]);

  return stats[0] || { average: null, total: 0 };
};

