import { authRoutes } from "../modules/auth/auth.routes";
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
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});
