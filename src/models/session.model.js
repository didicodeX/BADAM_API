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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SessionSchema.virtual("status").get(function () {
  return new Date(this.endDateTime) < new Date() ? "Expired" : "Available";
});

export const Session = mongoose.model("Session", SessionSchema);
