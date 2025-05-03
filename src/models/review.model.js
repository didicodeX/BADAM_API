import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  reviewDate: {
    type: Date,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Review = mongoose.model("Review", ReviewSchema);
