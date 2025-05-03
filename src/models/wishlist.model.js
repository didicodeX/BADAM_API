import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
});

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
