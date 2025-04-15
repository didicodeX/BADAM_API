import { body } from "express-validator";

export const authValidator = [
  body("email")
    .isEmail()
    .withMessage("Veuillez fournir un email valide"),  // Validation du format de l'email
  body("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit comporter au moins 8 caractères"),  // Validation du mot de passe
];
