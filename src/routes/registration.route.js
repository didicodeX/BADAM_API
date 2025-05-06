import { Router } from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationsByUserId,
  getRegistrationsBySessionId,
  deleteRegistration,
} from "../controllers/registration.controller.js";
import { createRegistrationValidator } from "../validators/registration.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/:sessionId",
  createRegistrationValidator,
  validate,
  createRegistration
);
router.get("/me", getRegistrationsByUserId);
router.get("/:id", getRegistrations);

router.get(
  "/sessions/:sessionId",
  authorize("admin", "instructor"),
  getRegistrationsBySessionId
);
router.delete("/:sessionId", deleteRegistration);

export default router;
