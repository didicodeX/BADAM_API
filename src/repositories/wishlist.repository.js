import { Wishlist } from "../models/wishlist.model.js";

export const addToWishlist = async (userId, sessionId) => {
    const wishlist = new Wishlist({
        user: userId,
        session: sessionId
    });
    return await wishlist.save(); 
};

export const getUserWishlist = (userId) => {
    return Wishlist.find({ user:userId }).populate("session");
};

export const removeFromWishlist = (userId, sessionId) => {
    return Wishlist.findOneAndDelete({user:userId, session:sessionId });
}

export const isInWishlist = (userId, sessionId) => {
    return Wishlist.exists({ user:userId, session:sessionId });
};