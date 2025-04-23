import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteUserByAdmin,
  updateUserByAdmin,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", upload.single("avatar"), updateUserByAdmin);

router.patch("/", upload.single("avatar"), updateUser);

router.delete("/", deleteUser);
router.delete("/:id", deleteUserByAdmin);
export default router;
