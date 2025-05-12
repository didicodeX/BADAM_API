import mongoose from "mongoose";
import { Wishlist } from "../models/wishlist.model.js";

export const addToWishlist = async (userId, sessionId) => {
  const wishlist = new Wishlist({
    user: userId,
    session: sessionId,
  });
  return await wishlist.save();
};

export const getUserWishlist = async (userId) => {
  return Wishlist.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "session",
        foreignField: "_id",
        as: "sessionData",
      },
    },
    {
      $unwind: "$sessionData",
    },
    {
      $lookup: {
        from: "trainings",
        localField: "sessionData.training",
        foreignField: "_id",
        as: "trainingData",
      },
    },
    {
      $unwind: "$trainingData",
    },
    {
      $lookup: {
        from: "registrations",
        localField: "sessionData._id",
        foreignField: "session",
        as: "registrations",
      },
    },
    {
      $addFields: {
        "sessionData.currentNbParticipants": { $size: "$registrations" },
        "sessionData.training": {
          title: "$trainingData.title",
          images: "$trainingData.images",
        },
      },
    },
    {
      $project: {
        user: 1,
        session: "$sessionData",
      },
    },
  ]);
};

export const removeFromWishlist = (userId, sessionId) => {
  return Wishlist.findOneAndDelete({ user: userId, session: sessionId });
};

export const isInWishlist = (userId, sessionId) => {
  return Wishlist.exists({ user: userId, session: sessionId });
};
