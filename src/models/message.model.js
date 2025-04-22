import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  contenuMessage: { type: String },
  expediteur: { type: String },
  destinaitaire: { type: String },
  date: { type: Date, default: Date.now },
  vu: { type: Boolean, default: false },

  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const Message = mongoose.model("Message", MessageSchema);
