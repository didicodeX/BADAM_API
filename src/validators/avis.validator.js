import { body } from "express-validator";

export const avisValidator = [
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

  


    
];
