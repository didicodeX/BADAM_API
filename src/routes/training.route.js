import { Router } from "express";
import {
  createTraining,
  getAllTraining,
  getTraining,
  updateTraining,
  deleteTraining,
  getReviewByTraining,
  getTrainingsByUser,
  getCreateTrainingsByUser,
} from "../controllers/training.controller.js";
import { createTrainingValidator } from "../validators/Training.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  createTrainingValidator,
  validate,
  createTraining
);

router.get("/", getAllTraining);

router.get("/me", getCreateTrainingsByUser);
router.get("/:id", getTraining);
router.get("/:userId", getTrainingsByUser);
router.get("/user/:userId", getTrainingsByUser);

//GET /Trainings/:id/Review — Voir tous les Review d’une Training, via ses sessions
router.patch("/:id", createTrainingValidator, validate, updateTraining);

router.delete("/:id", deleteTraining);

router.get("/:id/review", getReviewByTraining);

export default router;
