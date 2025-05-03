import { body } from "express-validator";

export const sessionTrainingValidator = [
  body("nbParticipants")
    .isInt()
    .withMessage("Le nombre de participants doit être superieur a 1 "),

  // body("maxParticipants")
  // .isInt({ min: 1 })
  // .withMessage("Le max de participants doit être superieur a 1 "),

  body("dateDebut")
    .notEmpty()
    .withMessage("La date de début est requise")
    .isISO8601()
    .withMessage("La date de début doit être au format ISO"),

  body("heureDebut")
    .notEmpty()
    .withMessage("L'heure  de début est requise")
    .isString()
    .withMessage("L'heure  de début doit être au format ISO"),

  body("heureFin")
    .notEmpty()
    .withMessage("L'heure de fin  est requise")
    .isString()
    .withMessage("L'heure  de fin doit être au format ISO"),

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

  body("coverImage")
    .optional()
    .isString()
    .withMessage("Une image de couverture est requise"),
];
