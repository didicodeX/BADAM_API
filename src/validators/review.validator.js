import { body } from "express-validator";

export const reviewValidator = [
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères"),

  body("rating")
    .optional()
    .isNumeric()
    .withMessage("La note doit être un nombre"),
];
