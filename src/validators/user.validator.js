import { body } from "express-validator";

export const createUserValidator = [
  body("name").notEmpty().withMessage("le nom est requis"),

  body("email")
    .notEmpty().withMessage("L'email est requis")
    .isEmail().withMessage("Veuillez fournir un email valide"),

  body("password")
    .notEmpty().withMessage("Le mot de passe est requis")
    .isLength({ min: 8 }).withMessage("Le mot de passe doit comporter au moins 8 caractères"),
];
