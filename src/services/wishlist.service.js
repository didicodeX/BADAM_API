import * as wishlistRepo from "../repositories/wishlist.repository.js"

export const addToWishlist = async (userId, sessionId) => {
    const exists = await wishlistRepo.isInWishlist(userId, sessionId);
    if (exists) {
        throw new Error("Cette session est déjà dans la wishlist.");
    }

    return await wishlistRepo.addToWishlist(userId, sessionId);
};

export const getUserWishlist = async (userId) => {
    return await wishlistRepo.getUserWishlist(userId);
};

export const removeFromWishlist = async (userId, sessionId) => {
    const exists = await wishlistRepo.isInWishlist(userId, sessionId);
    if (!exists) {
        throw new Error("Cette session n'est pas dans la wishlist.");
    }

    return await wishlistRepo.removeFromWishlist(userId, sessionId);
};