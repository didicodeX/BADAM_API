import { Router } from "express";
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import formationRoutes from "../routes/formation.route.js";
import sessionRoutes from "../routes/session.route.js";
import registrationRoutes from "../routes/registration.route.js";
import wishlistRoutes from "../routes/wishlist.route.js";
import avisRoutes from "../routes/avis.route.js";

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

router.use("/users", userRoutes);

router.use(
  "/formations",
  authenticate,
  authorize("formateur"),
  formationRoutes
);

router.use("/sessions", authenticate, authorize("formateur"), sessionRoutes);

router.use("/avis", authenticate,  avisRoutes);

router.use(
  "/registrations",
  authenticate,
  registrationRoutes
);


router.use(
  "/wishlist",
  authenticate,
  wishlistRoutes
);

export default router;
