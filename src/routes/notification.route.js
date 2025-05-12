import { Router } from "express";
import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", getMyNotifications);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
