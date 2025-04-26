import { body } from "express-validator";

export const createChatValidator = [
<<<<<<< Updated upstream
  
=======
>>>>>>> Stashed changes
  body("dernierMessage.contenu")
    .optional()
    .isString()
    .withMessage("Le contenu du message doit être une chaîne de caractères"),

  body("dernierMessage.date")
    .optional()
    .isISO8601()
    .withMessage("La date du message est invalide"),

  body("archivé")
    .optional()
    .isBoolean()
    .withMessage("La valeur de 'archivé' doit être true ou false"),
];
