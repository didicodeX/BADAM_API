import { Router } from "express";
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.use("/auth", authRoutes);
router.use(
  "/users",
  authenticate,
  authorize("superAdmin", "admin"),
  userRoutes
);

export default router;
