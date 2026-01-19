import { authRoutes } from "../modules/auth/auth.routes";
import { divisionRoutes } from "../modules/division/division.routes";
import { tourTypeRoutes } from "../modules/tour/tour.routes";
import { userRoutes } from "../modules/user/user.routes";
import { Router } from "express";

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
    path: "/tour-type",
    route: tourTypeRoutes,
  },
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});
