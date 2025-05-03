import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    registrationDate: { type: Date, default: Date.now },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Registration = mongoose.model("Registration", RegistrationSchema);
