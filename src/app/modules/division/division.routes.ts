import { Router } from "express";
import { divisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.createDivision,
);
router.patch(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.updateDivision,
);
router.get("/", divisionController.getDivisions);
router.get("/:id", divisionController.getDivisionById);
router.delete(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.deleteDivision,
);

export const divisionRoutes = router;
