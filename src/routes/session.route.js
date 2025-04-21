import { Router } from "express";

import {
  createSession,
  getAllSessions,
  getSession,
  getSessionsByFormation,
  updateSession,
  deleteSession,
  getAvisBySessionId,
} from "../controllers/session.controller.js";
import { sessionFormationValidator } from "../validators/session.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", sessionFormationValidator, validate, createSession);
router.get("/", getAllSessions);
router.get("/:id", getSession);
router.get("/formation/:formationId", getSessionsByFormation);
router.patch("/:id", sessionFormationValidator, validate, updateSession);
router.delete(":id", deleteSession);
router.get("/:id/avis", getAvisBySessionId);


export default router;
