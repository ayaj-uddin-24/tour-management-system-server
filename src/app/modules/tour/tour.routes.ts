import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { tourController } from "./tour.controller";
import { Role } from "../user/user.interface";
import { Router } from "express";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = Router();

/* ==================== Tour Type Routes ==================== */
router.post(
  "/tour-type",
  validateRequest(createTourTypeZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.createTourType,
);
router.patch(
  "/tour-type/:id",
  validateRequest(updateTourTypeZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.updateTourType,
);
router.get("/tour-type", tourController.getTourTypes);
router.delete(
  "/tour-type/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTourType,
);

/* ==================== Tour Routes ==================== */
router.post(
  "/",
  validateRequest(createTourZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.createTour,
);
router.get("/", tourController.getTour);
router.patch(
  "/:id",
  validateRequest(updateTourZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.updateTour,
);
router.get("/:slug", tourController.getSingleTour);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTour,
);

export const tourRoutes = router;
