import express from "express";
import AuthController from "../controllers/auth.controller";

const authController = new AuthController();
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/password-reset/request", authController.requestPasswordReset);
router.post("/password-reset", authController.resetPassword);
router.post("/verify-email", authController.verifyEmail);
router.post("/verify-phone", authController.verifyPhone);
router.post("/oauth", authController.oauthLogin);
router.post("/logout", authController.logout);

export default router;
