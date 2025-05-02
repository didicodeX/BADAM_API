import { body } from "express-validator";

export const createFormationValidator = [
  body("titre").notEmpty().withMessage("Le titre est requis"),

  body("description").notEmpty().withMessage("La description est requise"),

];
