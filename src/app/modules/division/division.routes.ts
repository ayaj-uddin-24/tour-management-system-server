import { validateRequest } from "../../middlewares/validateRequest";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { Router } from "express";
import {
  createDivisionZodSchema,
  updateDivisionZodSchema,
} from "./division.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createDivisionZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.createDivision,
);
router.get("/", divisionController.getDivisions);
router.patch(
  "/:id",
  validateRequest(updateDivisionZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.updateDivision,
);
router.get("/:id", divisionController.getDivisionById);
router.delete(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.deleteDivision,
);

export const divisionRoutes = router;
