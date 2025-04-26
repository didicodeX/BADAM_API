import { Router } from "express";
import {
  createFormation,
  getAllFormation,
  getFormation,
  updateFormation,
  deleteFormation,
  getAvisByFormation,
  getFormationsByUser,getCreateFormationsByUser
} from "../controllers/formation.controller.js";
import { createFormationValidator } from "../validators/formation.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", upload.fields([
  { name: "image", maxCount: 5 },
  { name: "video", maxCount: 2 },
]), createFormationValidator, validate, createFormation);

router.get("/", getAllFormation);

router.get("/:id", getFormation);
router.get("/:userId", getFormationsByUser);
router.get("/user/:userId", getFormationsByUser);
router.get("/formateur/:userId", getCreateFormationsByUser);

//GET /formations/:id/avis — Voir tous les avis d’une formation, via ses sessions
router.patch("/:id", createFormationValidator, validate, updateFormation);

router.delete("/:id", deleteFormation);

router.get("/:id/avis", getAvisByFormation);


export default router;
