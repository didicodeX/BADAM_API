import { Router } from "express";
import { getNotificationsByinstructorId } from "../controllers/notification.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

// Récupérer les notifications d'un instructor
router.get(
  "/:instructorId",
  authorize("instructor"),
  getNotificationsByinstructorId
);

export default router;
