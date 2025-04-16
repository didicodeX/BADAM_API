import { Router } from "express";
import authRoutes from "../routes/auth.route.js"
import formationRoutes from "../routes/formation.route.js"
import sessionRoutes from "../routes/sessionFormation.route.js"
import {authorize} from "../middlewares/authorize.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import userRoutes from "../routes/user.route.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

router.use("/auth", authRoutes);
router.use("/users",userRoutes);
router.use("/formations",authenticate, authorize("formateur"),formationRoutes);
router.use("/sessionformation",authenticate, authorize("formateur"), sessionRoutes);



export default router;
