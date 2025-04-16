import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", authValidator, validate, register);
router.post("/login", authValidator, validate, login);
router.post("/logout", logout);
router.get("/me", authenticate, profile);

export default router;
