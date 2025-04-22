import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
