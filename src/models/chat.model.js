import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    }],
    dernierMessage: {
      contenu: String,
      date: Date,
    },
    archivé: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
