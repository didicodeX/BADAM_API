import {Router} from "express";

  
  import {createSession, getAllSessions, getSession,getSessionsByFormation,updateSession,deleteSession, } from "../controllers/sessionFormation.controller.js";
import { sessionFormationValidator } from "../validators/sessionFormation.validator.js";
import {validate} from "../middlewares/validate.middleware.js";




const router =Router();

router.post("/",sessionFormationValidator,validate,createSession);
router.get("/", getAllSessions);
router.get("/:id", getSession);
router.get(":formationId", getSessionsByFormation);
router.patch("/:id",sessionFormationValidator,validate, updateSession);
router.delete(":id", deleteSession);


export default router;