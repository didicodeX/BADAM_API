import {body} from "express-validator"




export const wishlistValidator = [
  body("formation")
    .notEmpty()
    .withMessage("La formation est requise")
    .isMongoId()
    .withMessage("ID de formation invalide"),

  body("user")
    .notEmpty()
    .withMessage("L'utilisateur est requis")
    .isMongoId()
    .withMessage("ID utilisateur invalide"),

  body("creationDate")
    .optional()
    .isISO8601()
    .withMessage("La date de création invalide")
    .toDate(),
];