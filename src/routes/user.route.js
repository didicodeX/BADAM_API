import { Router } from "express";

import { getAllUsers,getUserById ,createUser,updateUserById,deleteUserById} from "../controllers/user.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/",auth,authorize("admin"),getAllUsers);
router.get("/:id",auth,authorize("admin"),getUserById);
router.post("/",auth,authorize("admin"),createUser);
router.patch("/:id",auth,authorize("admin"),updateUserById);
router.delete("/:id",auth,authorize("admin"),deleteUserById);
export default router;