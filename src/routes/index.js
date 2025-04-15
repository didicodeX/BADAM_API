import { Router } from "express";
import authRoutes from "../routes/auth.route.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

router.use("/auth", authRoutes);

export default router;
