import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { authController } from "./auth.controller";
import { NextFunction, Request, Response, Router } from "express";
import { envVars } from "../../config/env";

const router = Router();

router.post("/login", authController.credentialsLogin);
router.post("/refresh-token", authController.getNewAccessToken);
router.post("/logout", authController.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authController.resetPassword,
);
router.get("/google", (req: Request, res: Response, next: NextFunction) => {
  const redirect = req.query.redirect || "/";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect as string,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVars.FRONTEND_URL}/login`,
    session: false,
  }),
  authController.googleCallBack,
);

export const authRoutes = router;
