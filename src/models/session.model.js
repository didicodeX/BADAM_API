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
  maxParticipant: {
    type: Number,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
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
