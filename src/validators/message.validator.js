import { body } from "express-validator";

export const createMessageValidator = [
  body("message").notEmpty().withMessage("Le message est requis"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("La date doit être une date valide"),

  body("vu")
    .optional()
    .isBoolean()
    .withMessage("La valeur 'vu' doit être true ou false"),
];

export const updateMessageValidator = [
  body("message")
    .optional()
    .notEmpty()
    .withMessage("Le message ne peut pas être vide"),

  body("vu")
    .optional()
    .isBoolean()
    .withMessage("La valeur 'vu' doit être true ou false"),
];
