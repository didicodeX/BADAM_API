import { Router } from "express";
import { createChat
 } from "../controllers/chat.controller.js";

const router = Router();

router.post("/:sessionId",createChat);

export default router;