import mongoose from "mongoose";

const SessionFormationSchema = new mongoose.Schema({
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formation",
    require: true,
  },
  nbParticipants: {
    type: Number,
  },
  comment:{type:String},
  rating:{type:Number},
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },

  statut: {
    type: String,
    enum: ["Disponible", "Expirée"],
    default: "Disponible",
  },
});

export const SessionFormation = mongoose.model(
  "SessionFormation",
  SessionFormationSchema
);
