import { body } from "express-validator";

export const createUserValidator = [
  body("name").notEmpty().withMessage("le nom est requis"),
  body("email").notEmpty().isEmail().isLength({min: 8}).withMessage("l'email est requis"),
  body("password").notEmpty().withMessage("le mot de passe est requis"),
  body("role")
    .isIn(["apprenti", "formateur", "admin","superAdmin"])
    .withMessage("role invalide"),
  body("location.adress").notEmpty().withMessage("adress requise"),
  body("location.city").notEmpty().withMessage("ville requise"),
  body("location.province").notEmpty().withMessage("province requise"),
  body("location.country").notEmpty().withMessage("country requise"),
  body("location.postalCode").notEmpty().withMessage("postalCode requise"),

  
];
