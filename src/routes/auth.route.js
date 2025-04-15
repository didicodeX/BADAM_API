import express from 'express';
import { registerHandler,loginHandler,logout,profile} from '../controllers/auth.controller.js';
import {auth} from "../middlewares/auth.middleware.js"
import { authValidator } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

// Déclare la route POST /api/auth/register
router.post('/register',authValidator, validate,registerHandler);
router.post('/login',authValidator,validate,loginHandler);
router.post('/logout',logout);
router.get("/me",auth,profile);  

export default router;
