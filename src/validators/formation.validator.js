import { body } from "express-validator";

export const createFormationValidator = [
  body("titre").notEmpty().withMessage("Le titre est requis"),

  body("description").notEmpty().withMessage("La description est requise"),

  body("adressFormation")
    .notEmpty()
    .withMessage("L'adresse de la formation est requise"),

  body("nbvues")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Le nombre de vues doit être un entier positif"),

  body("media").optional().isString().withMessage(" rentrer un media"),
];
