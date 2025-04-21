import { Router } from "express";
import {
  createFormation,
  getAllFormation,
  getFormation,
  updateFormation,
  deleteFormation,
  getAvisByFormation,
} from "../controllers/formation.controller.js";
import { createFormationValidator } from "../validators/formation.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", createFormationValidator, validate, createFormation);
router.get("/", getAllFormation);
router.get("/:id", getFormation);
//GET /formations/:id/avis — Voir tous les avis d’une formation, via ses sessions
router.patch("/:id", createFormationValidator, validate, updateFormation);
router.delete("/:id", deleteFormation);
router.get("/:id/avis", getAvisByFormation);


export default router;
