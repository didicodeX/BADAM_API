import { body } from "express-validator";

export const createMessageValidator = [
  body("message").notEmpty().withMessage("Le message est requis"),

  body("expediteur").notEmpty().withMessage("L'expéditeur est requis"),

  body("destinaitaire").notEmpty().withMessage("Le destinataire est requis"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("La date doit être une date valide"),

  body("vu")
    .optional()
    .isBoolean()
    .withMessage("La valeur 'vu' doit être true ou false"),

  body("chat")
    .notEmpty()
    .withMessage("L'ID du chat est requis")
    .isMongoId()
    .withMessage("ID du chat invalide"),

  body("user")
    .notEmpty()
    .withMessage("L'utilisateur est requis")
    .isMongoId()
    .withMessage("ID utilisateur invalide"),
];

import { body } from "express-validator";

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
