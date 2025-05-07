import { Router } from "express";
import {
    addToWishlist,
    getUserWishlist,
    removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/:sessionId", addToWishlist);
router.get("/", getUserWishlist);
router.delete("/:sessionId", removeFromWishlist);

export default router;
