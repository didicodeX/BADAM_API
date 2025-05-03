import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createSession,
  getAllSessions,
  getSession,
  getSessionsByTraining,
  getSessionsByTrainingTitle,
  updateSession,
  deleteSession,
  getReviewBySessionId,
  getSessionsByUser,
  getSessionsWithCount
} from "../controllers/session.controller.js";
import { sessionTrainingValidator } from "../validators/session.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/me", authenticate, getSessionsByUser);
router.post(
  "/:trainingId",
  authenticate,
  sessionTrainingValidator,
  validate,
  createSession
);
router.get("/", getAllSessions);
router.get("/search", getSessionsByTrainingTitle);
router.get("/:id", authenticate, getSession);
router.get("/training/:trainingId", getSessionsByTraining);

router.patch(
  "/:id",
  authenticate,
  sessionTrainingValidator,
  validate,
  updateSession
);
router.delete(":id", authenticate, deleteSession);
router.get("/:id/review", getReviewBySessionId);

router.get("/with-participant-count", getSessionsWithCount);
export default router;
