import { body } from "express-validator";

export const sessionTrainingValidator = [
  body("maxParticipants")
    .isInt({ min: 1 })
    .withMessage("Le nombre maximum de participants doit être supérieur à 0"),

  body("startDateTime")
    .notEmpty()
    .withMessage("La date de début est requise")
    .isISO8601()
    .withMessage("La date de début doit être une date valide"),

  body("endDateTime")
    .notEmpty()
    .withMessage("La date de fin est requise")
    .isISO8601()
    .withMessage("La date de fin doit être une date valide")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDateTime)) {
        throw new Error("La date de fin doit être après la date de début");
      }
      return true;
    }),

  body("coverImage")
    .optional()
    .isString()
    .withMessage("L'image de couverture doit être une URL"),
];
