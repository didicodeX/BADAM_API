import { body } from "express-validator";

export const createTrainingValidator = [
  body("title").notEmpty().withMessage("Le titre est requis"),

  body("description").notEmpty().withMessage("La description est requise"),
];
