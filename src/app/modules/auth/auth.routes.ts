import { authController } from "./auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", authController.credentialsLogin);
router.post("/refresh-token", authController.getNewAccessToken);

export const authRoutes = router;
