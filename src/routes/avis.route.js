import { Router } from "express";

import {
  createAvis,
  getAllAvis,
  getAvis,
  getAvisByFormation,
  getAvisByUser,
  getAvisBySession,
  updateAvis,
  deleteAvis,
  getTopRatedFormations,
  getTopRatedSessions,
} from "../controllers/avis.controller.js";
import { avisValidator } from "../validators/avis.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/:sessionId", avisValidator, validate, createAvis);
router.get("/", getAllAvis);
router.get("/:id", getAvis);
router.get("/formation/:formationId", getAvisByFormation);
router.get("/user/:userId", getAvisByUser);
router.get("/session/:sessionId", getAvisBySession);
router.patch("/:id", avisValidator, validate, updateAvis);
router.delete(":id", deleteAvis);
router.get("/formations/top-rated", getTopRatedFormations);
router.get("/sessions/top-rated", getTopRatedSessions);


export default router;
