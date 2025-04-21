import mongoose from "mongoose";

const AvisSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  dateAvis: {
    type: Date,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const Avis = mongoose.model("Avis", AvisSchema);
