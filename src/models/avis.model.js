import mongoose from "mongoose";

const AvisSchema = new mongoose.Schema({
  comment: { type: String },
  rating: { type: Number },
  dateAvis: {
    type: Date,
    required: true,
  },
  sessionFormation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SessionFormation",
    require: true,
  },
});

export const Avis = mongoose.model("Avis", AvisSchema);
