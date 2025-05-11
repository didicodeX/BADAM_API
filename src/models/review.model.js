import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    comment: { type: String },
    rating: { type: Number },
    training: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true, // ou facultatif
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", ReviewSchema);
