import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { Router } from "express";

const router = Router();

router.post("/", BookingController.createBooking);
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getBookings,
);
router.patch("/:id", BookingController.updateBooking);
router.get("/:slug", BookingController.getSingleBooking);
router.delete(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.deleteBooking,
);

export const bookingRoutes = router;
