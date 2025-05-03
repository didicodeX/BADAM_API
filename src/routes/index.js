import { Router } from "express";
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import TrainingRoutes from "../routes/Training.route.js";
import sessionRoutes from "../routes/session.route.js";
import registrationRoutes from "../routes/registration.route.js";
import wishlistRoutes from "../routes/wishlist.route.js";
import ReviewRoutes from "../routes/Review.route.js";
import notificationRoutes from "../routes/Review.route.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.use("/auth", authRoutes);

router.use("/users", authenticate, userRoutes);

router.use("/trainings", authenticate, TrainingRoutes);

router.use("/sessions", sessionRoutes);

router.use("/teview", authenticate, ReviewRoutes);

router.use("/registrations", authenticate, registrationRoutes);

router.use("/wishlist", authenticate, wishlistRoutes);

router.use("/notifications", authenticate, notificationRoutes);

export default router;
