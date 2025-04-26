import { body } from "express-validator";

export const sessionFormationValidator = [
  body("maxParticipant")
    .isInt({ min: 1 })
    .withMessage("Le nombre de participants doit être superieur ou égale a 1 "),

  body("dateDebut")
    .notEmpty()
    .withMessage("La date de début est requise")
    .isISO8601()
    .withMessage("La date de début doit être au format ISO"),

  body("dateFin")
    .notEmpty()
    .withMessage("La date de fin est requise")
    .isISO8601()
    .withMessage("La date de fin doit être au format ISO")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.dateDebut)) {
        throw new Error("La date de fin doit être après la date de début");
      }
      return true;
    }),

  body("statut")
    .optional()
    .isIn(["Disponible", "Expirée"])
    .withMessage("Le statut doit être 'Disponible' ou 'Expirée'"),
];
