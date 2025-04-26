import { body } from "express-validator";

export const createRegistrationValidator = [
  body("dateInscription")
    .optional()
    .isISO8601()
    .withMessage("La date d'inscription doit être une date valide"),
];
