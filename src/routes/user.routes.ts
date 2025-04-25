import express from "express";
import UserController from "../controllers/user.controller";

const userController = new UserController();
const router = express.Router();

router.patch("/:userId/status", userController.toggleAccountStatus);
router.put("/:userId/profile", userController.updateProfile);
router.get("/:userId/profile", userController.getProfile);

export default router;
