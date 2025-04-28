import { Router } from "express";
import { getNotificationsByFormateurId } from "../controllers/notification.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

// Récupérer les notifications d'un formateur
router.get("/:formateurId", authorize("formateur"), getNotificationsByFormateurId);

export default router;
