import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  messageContent: { type: String },
  date: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },

  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Message = mongoose.model("Message", MessageSchema);
