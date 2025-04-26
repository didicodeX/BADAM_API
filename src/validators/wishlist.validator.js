import { body } from "express-validator";

export const wishlistValidator = [
 
  body("creationDate")
    .optional()
    .isISO8601()
    .withMessage("La date de création invalide")
    .toDate(),
];
