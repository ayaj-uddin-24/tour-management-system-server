import { authController } from "./auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", authController.credentialsLogin);

export const authRoutes = router;
