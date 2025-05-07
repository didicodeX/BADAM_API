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
  getSessionsWithCount,
  getMySessions,
  getMySessionsWithRegistrations,
  getSessionDetails,
  getSessionDetailsPublic,
} from "../controllers/session.controller.js";
import { sessionTrainingValidator } from "../validators/session.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/me", authenticate, getMySessions);
// router.get("/me", authenticate, getSessionsByUser);
router.post(
  "/:trainingId",
  authenticate,
  // sessionTrainingValidator,
  // validate,
  createSession
);
router.get("/", getAllSessions);

router.get("/:id", authenticate, getSession);

router.get("/:id/details", authenticate, getSessionDetailsPublic);

router.get("/:id/details/me", authenticate, getSessionDetails);

router.get("/search", getSessionsByTrainingTitle);

router.get("/trainings/:trainingId", getSessionsByTraining);

router.patch("/:id", authenticate, updateSession);

router.delete("/:id", authenticate, deleteSession);

router.get("/:id/review", getReviewBySessionId);

router.get("/with-participant-count", getSessionsWithCount);

router.get(
  "/mine/with-registrations",
  authenticate,
  getMySessionsWithRegistrations
);

export default router;
