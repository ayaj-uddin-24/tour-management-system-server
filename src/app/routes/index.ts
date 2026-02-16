import { divisionRoutes } from "../modules/division/division.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { tourRoutes } from "../modules/tour/tour.routes";
import { userRoutes } from "../modules/user/user.routes";
import { Router } from "express";
import { bookingRoutes } from "../modules/booking/booking.routes";

export const router = Router();

const routeModules = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/division",
    route: divisionRoutes,
  },
  {
    path: "/tour",
    route: tourRoutes,
  },
  {
    path: "/booking",
    route: bookingRoutes,
  },
  {
    path: "/payment",
    route: tourRoutes,
  },
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});
