import { Router } from "express";

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

router.post("/:formationId", sessionFormationValidator, validate, createSession);
router.get("/", getAllSessions);
router.get("/search", getSessionsByFormationTitle);
router.get("/:id", getSession);
router.get("/formation/:formationId", getSessionsByFormation);
router.get("/user/:userId", getSessionsByUser);

router.patch("/:id", sessionFormationValidator, validate, updateSession);
router.delete(":id", deleteSession);
router.get("/:id/avis", getAvisBySessionId);


export default router;
