import { body } from "express-validator";

export const validateAvis = [
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères"),

  body("rating")
    .optional()
    .isNumeric()
    .withMessage("La note doit être un nombre"),

  body("dateAvis")
    .notEmpty()
    .withMessage("La date de début est requise")
    .isISO8601()
    .toDate()
    .withMessage("La date de début doit être une date valide"),

  body("sessionFormation")
    .notEmpty()
    .withMessage("La sessionFormation est requise")
    .isMongoId()
    .withMessage("sessionFormation doit être un ID MongoDB valide"),
];
