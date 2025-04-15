import mongoose from "mongoose";

const whishlistSchema = new mongoose.Schema({
  sessionFormation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SessionFormation",
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const whishlist = mongoose.model("whishlist", whishlistSchema);
