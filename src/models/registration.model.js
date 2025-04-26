import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  dateInscription: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    require: true,
  },
});

export const Registration = mongoose.model(
  "Registration",
  RegistrationSchema
);
