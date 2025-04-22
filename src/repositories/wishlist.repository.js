import { Wishlist } from "../models/wishlist.model.js";

export const addToWishlist = (userId, sessionId) => {
    return Wishlist.create({ userId, sessionId });
}

export const getUserWishlist = (userId) => {
    return Wishlist.find({ userId }).populate("sessionId");
};

export const removeFromWishlist = (userId, sessionId) => {
    return Wishlist.findOneAndDelete({ userId, sessionId });
}

export const isInWishlist = (userId, sessionId) => {
    return Wishlist.exists({ userId, sessionId });
  };