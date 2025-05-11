import { Session } from "../models/session.model.js";
import { Review } from "../models/review.model.js";
import { Registration } from "../models/registration.model.js";
import mongoose from "mongoose";

export const createSession = async (data, userId, trainingId) => {
  return await Session.create({
    ...data,
    createdBy: userId,
    training: trainingId,
  });
};

export const getAllSessions = async () => {
  return await Session.find().populate("training");
};

export const findSessionsByCreator = (userId) => {
  return Session.find({ createdBy: userId }).populate("training");
};

export const getSession = async (id) => {
  return await Session.findById(id);
};

export const getSessionsByTraining = async (trainingId) => {
  return Session.aggregate([
    {
      $match: {
        training: new mongoose.Types.ObjectId(trainingId),
      },
    },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    {
      $unwind: "$training",
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "session",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" }, // ✅ ici la moyenne
      },
    },
    {
      $project: {
        registrations: 0,
      },
    },
  ]);
};


export const getSessionsByUser = async (userId) => {
  return await Registration.find({ user: userId }).populate("session");
};

export const getSessionsByTrainingTitle = async (searchText) => {
  return await Session.find()
    .populate({
      path: "training",
      match: { titre: { $regex: searchText, $options: "i" } },
    })
    .then((sessions) => sessions.filter((s) => s.training));
};

export const updateSession = async (id, data) => {
  return await Session.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSession = async (id) => {
  return await Session.findByIdAndDelete(id);
};

export const getReviewBySessionId = async (sessionId) => {
  return await Review.find({ session: sessionId })
    .select("comment rating createdAt")
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
};


export const getSessionsWithParticipantCount = async () => {
  return Session.aggregate([
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    {
      $unwind: "$training",
    },
    {
      $project: {
        registrations: 0,
      },
    },
  ]);
};

export const getMySessionsWithRegistrations = async (userId) => {
  return Session.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    {
      $unwind: "$training",
    },
    {
      $project: {
        registrations: 0, // ou garde-les si tu veux les noms des participants
      },
    },
  ]);
};

export const findSessionWithTraining = (id) => {
  return Session.findById(id)
    .select("-createdAt -updatedAt -__v -createdBy")
    .populate("training", "title description");
};

export const getSessionWithTraining = async (sessionId) => {
  return await Session.findById(sessionId).populate("training");
};

export const findSessionWithTrainingAndParticipants = async (id) => {
  const sessionId = new mongoose.Types.ObjectId(id);

  return Session.aggregate([
    {
      $match: { _id: sessionId },
    },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    {
      $unwind: "$training",
    },
    {
      $project: {
        _id: 1,
        "training._id": 1,
        "training.title": 1,
        "training.description": 1,
        "training.images": 1,
        currentNbParticipants: 1,
        startDateTime: 1,
        endDateTime: 1,
        address: 1,
        maxParticipants: 1,
        coverImage: 1,
      },
    },
  ]).then((res) => res[0]); // retourne un seul document
};

export const findSessionWithInstructor = async (id) => {
  const sessionId = new mongoose.Types.ObjectId(id);

  const results = await Session.aggregate([
    {
      $match: { _id: sessionId },
    },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $unwind: "$createdBy" },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $project: {
        _id: 1, 
        "createdBy.avatar": 1,
        "createdBy.name": 1,
        "createdBy.createdAt": 1,
        "createdBy.bio": 1,
        "training._id": 1, 
        "training.title": 1,
        "training.description": 1,
        "training.images": 1,
        currentNbParticipants: 1,
        startDateTime: 1,
        endDateTime: 1,
        address: 1,
        maxParticipants: 1,
        coverImage: 1,
      },
    },
  ]);

  return results[0];
};

export const getTopRatedSessions = async () => {
  const sessions = await Session.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "session",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    { $limit: 6 },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $project: {
        registrations: 0,
        reviews: 0,
      },
    },
  ]);

  return sessions;
};

export const getLatestSessions = async () => {
  return Session.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 6,
    },
    {
      $lookup: {
        from: "registrations",
        localField: "_id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        currentNbParticipants: { $size: "$registrations" },
      },
    },
    {
      $lookup: {
        from: "trainings",
        localField: "training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $project: {
        registrations: 0,
      },
    },
  ]);
};
