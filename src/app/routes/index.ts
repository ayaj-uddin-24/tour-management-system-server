import { authRoutes } from "../modules/auth/auth.routes";
import { divisionRoutes } from "../modules/division/division.routes";
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
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});
