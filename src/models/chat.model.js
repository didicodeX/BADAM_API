import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      content: String,
      date: Date,
    },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
