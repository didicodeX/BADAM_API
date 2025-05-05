import { Router } from "express";
import {
  createTraining,
  createTrainingMulter,
  getAllTraining,
  getTraining,
  updateTraining,
  deleteTraining,
  getReviewByTraining,
  getTrainingsByUser,
  getCreateTrainingsByUser,
} from "../controllers/training.controller.js";
import { createTrainingValidator } from "../validators/training.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", createTrainingValidator, validate, createTraining);

router.post(
  "/multer",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 3 },
  ]),
  createTrainingValidator,
  validate,
  createTrainingMulter
);

router.get("/", getAllTraining);

router.get("/me", getCreateTrainingsByUser);
router.get("/:id", getTraining);
router.get("/:userId", getTrainingsByUser);
router.get("/user/:userId", getTrainingsByUser);

//GET /trainings/:id/reviews — Voir tous les avis d’une formation, via ses sessions
router.patch("/:id", createTrainingValidator, validate, updateTraining);

router.delete("/:id", deleteTraining);

router.get("/:id/review", getReviewByTraining);

export default router;
