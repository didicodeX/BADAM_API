import { Session } from "../models/session.model.js";
import { Review } from "../models/review.model.js";
import { Registration } from "../models/registration.model.js";

export const createSession = async (data, userId, trainingId) => {
  return await Session.create({ ...data, user: userId, training: trainingId });
};

export const getAllSessions = async () => {
  return await Session.find();
};

export const getSession = async (id) => {
  return await Session.findById(id);
};

export const getSessionsByTraining = async (trainingId) => {
  return await Session.find({ training: trainingId });
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
    .select("comment rating dateReview")
    .sort({ dateReview: -1 }); // tri du plus récent au plus ancien
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
      $project: {
        registrations: 0,
      },
    },
  ]);
};