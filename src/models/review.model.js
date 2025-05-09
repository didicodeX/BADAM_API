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
