import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    training: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxParticipants: {
      type: Number,
    },
    address: { type: String },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    coverImage: { type: String },
    status: {
      type: String,
      enum: ["Available", "Expired"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model("Session", SessionSchema);
