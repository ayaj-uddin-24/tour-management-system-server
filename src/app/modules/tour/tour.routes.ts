import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { tourController } from "./tour.controller";

const router = Router();

/* ==================== Tour Type Routes ==================== */
router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.createTourType,
);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.updateTourType,
);
router.get("/", tourController.getTourTypes);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTourType,
);

/* ==================== Tour Routes ==================== */
router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.createTour,
);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.updateTour,
);
router.get("/", tourController.getTour);
router.get("/:id", tourController.getTourByID);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTour,
);

export const tourTypeRoutes = router;
