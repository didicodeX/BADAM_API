import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formation",
    required: true,
  },
  nbParticipants: {
    type: Number,
  },
  adressSession: { type: String },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  heureDebut: {
    type: String,
    required: true,
     match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/
  },
  heureFin: {
    type: String,
    required: true,
     match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/
  },
  coverImage:{type:String,},

  statut: {
    type: String,
    enum: ["Disponible", "Expirée"],
    default: "Disponible",
  },
});

export const Session = mongoose.model(
  "Session",
  SessionSchema
);
