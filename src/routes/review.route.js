import { Router } from "express";

import {
  createReview,
  getAllReview,
  getReview,
  getReviewByTraining,
  getReviewByUser,
  getReviewBySession,
  updateReview,
  deleteReview,
  getTopRatedTrainings,
  getTopRatedSessions,
  getReviewsByTrainingId 
} from "../controllers/review.controller.js";
import { reviewValidator } from "../validators/review.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:trainingId", authenticate, createReview);
router.get("/:trainingId", getReviewsByTrainingId); // 🔐 auth requise
router.get("/", getAllReview);
router.get("/:id", getReview);
router.get("/training/:trainingId", getReviewByTraining);
router.get("/user/:userId", getReviewByUser);
router.get("/session/:sessionId", getReviewBySession);
router.patch("/:id", reviewValidator, validate, updateReview);
router.delete(":id", deleteReview);
router.get("/trainings/top-rated", getTopRatedTrainings);
router.get("/sessions/top-rated", getTopRatedSessions);

export default router;
