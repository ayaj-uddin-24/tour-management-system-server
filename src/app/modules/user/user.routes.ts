import { updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { userController } from "./user.controller";
import { Role } from "./user.interface";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  // validateRequest(createUserZodSchema),
  userController.createUser,
);
router.get(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  userController.getAllUsers,
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  userController.updateUser,
);

export const userRoutes = router;
