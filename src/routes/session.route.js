import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createSession,
  getAllSessions,
  getSession,
  getSessionsByFormation,getSessionsByFormationTitle,
  updateSession,
  deleteSession,
  getAvisBySessionId,getSessionsByUser
} from "../controllers/session.controller.js";
import { sessionFormationValidator } from "../validators/session.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/:formationId", authenticate,sessionFormationValidator, validate, createSession);
router.get("/", getAllSessions);
router.get("/search", getSessionsByFormationTitle);
router.get("/:id",authenticate, getSession);
router.get("/formation/:formationId", getSessionsByFormation);
router.get("/user/:userId",authenticate, getSessionsByUser);

router.patch("/:id", authenticate,sessionFormationValidator, validate, updateSession);
router.delete(":id", authenticate,deleteSession);
router.get("/:id/avis", getAvisBySessionId);


export default router;
