import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { authController } from "./auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", authController.credentialsLogin);
router.post("/refresh-token", authController.getNewAccessToken);
router.post("/logout", authController.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authController.resetPassword
);

export const authRoutes = router;
