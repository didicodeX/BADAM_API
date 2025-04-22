import * as wishlistService from "../services/wishlist.service.js";

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const { sessionId } = req.body;
        console.log(sessionId);
        
        await wishlistService.addToWishlist(userId, sessionId);

        res.status(201).json({
            message: "Session ajoutée à la wishlist.",
            data: { userId, sessionId }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const getUserWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const wishlist = await wishlistService.getUserWishlist(userId);
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const sessionId = req.params.id;

        const result = await wishlistService.removeFromWishlist(userId, sessionId);
        res.status(200).json({ message: "Session retirée de la wishlist.", result });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
