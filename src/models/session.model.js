import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formation",
    required: true,
  },
  maxNbParticipants: {
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
  coverImage:{type:String,},

  statut: {
    type: String,
    enum: ["Disponible", "Expirée"],
    default: "Disponible",
  },
},  {
  timestamps: true, 
});

export const Session = mongoose.model(
  "Session",
  SessionSchema
);
