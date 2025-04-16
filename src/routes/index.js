import { Router } from "express";
import authRoutes from "../routes/auth.route.js"
import userRoutes from "../routes/user.route.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

router.use("/auth", authRoutes);
router.use("/users",userRoutes);

export default router;
