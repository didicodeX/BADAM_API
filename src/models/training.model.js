import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: {
    type: [String],
  },
  videos: {
    type: [String],
  },
});

export const Training = mongoose.model("Training", TrainingSchema);
