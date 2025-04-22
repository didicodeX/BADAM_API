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

  body("maxParticipant")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Le nombre maximal de participants doit être au moins 1"),

  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères"),

  body("rating")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Le nombre d'etoile doit etre compris entre 0 et 5"),

  //body("media").optional().isString().withMessage(" rentrer un media"),
];
