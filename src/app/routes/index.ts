import { userRoutes } from "../modules/user/user.routes";
import { Router } from "express";

export const router = Router();

const routeModules = [
  {
    path: "/user",
    route: userRoutes,
  },
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});
