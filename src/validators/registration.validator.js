import { body } from "express-validator";

export const createRegistrationValidator = [
  body("dateInscription")
    .optional()
    .isISO8601()
    .withMessage("La date d'inscription doit être une date valide"),

  body("statut")
    .optional()
    .isIn(["en cours", "terminée", "abandonnée", "en pause"])
    .withMessage(
      "Statut invalide. Doit être 'en cours', 'terminée', 'abandonnée' ou 'en pause'"
    ),

  body("user")
    .notEmpty()
    .withMessage("L'utilisateur est requis")
    .isMongoId()
    .withMessage("ID utilisateur invalide"),

  body("session")
    .notEmpty()
    .withMessage("La session de formation est requise")
    .isMongoId()
    .withMessage("ID session invalide"),
];
