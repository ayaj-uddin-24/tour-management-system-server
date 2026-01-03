import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

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
