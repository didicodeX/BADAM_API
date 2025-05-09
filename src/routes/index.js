import { Router } from "express";
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import trainingRoutes from "../routes/training.route.js";
import sessionRoutes from "../routes/session.route.js";
import registrationRoutes from "../routes/registration.route.js";
import wishlistRoutes from "../routes/wishlist.route.js";
import reviewRoutes from "../routes/review.route.js";
import notificationRoutes from "../routes/notification.route.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.use("/auth", authRoutes);

router.use("/users", authenticate, userRoutes);

router.use("/trainings", authenticate, trainingRoutes);

router.use("/sessions", sessionRoutes);

router.use("/reviews", authenticate, reviewRoutes);

router.use("/registrations", authenticate, registrationRoutes);

router.use("/wishlist", authenticate, wishlistRoutes);

router.use("/notifications", authenticate, notificationRoutes);

export default router;
