import { Router } from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationsByUserId,
  getRegistrationsBySessionId,
  deleteRegistration
} from "../controllers/registration.controller.js";
import { createRegistrationValidator } from "../validators/registration.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post("/", createRegistrationValidator, validate, createRegistration);
router.get("/:id",authorize("admin"),getRegistrations);
router.get("/users/:userId",authorize("admin"), getRegistrationsByUserId);
router.get("/sessions/:sessionId",authorize("admin","formateur"),getRegistrationsBySessionId);
router.delete("/:id",authorize("admin","formateur","apprenti"),deleteRegistration);

export default router;
