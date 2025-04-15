import mongoose from "mongoose";

const whishlistSchema = new mongoose.Schema({
  creationDate: { type: Date },
  
  formation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formation",
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const whishlist = mongoose.model("whishlist", whishlistSchema);
