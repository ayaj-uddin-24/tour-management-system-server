import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import httpStatus from "http-status-codes";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization as string;
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "Unauthorize access token!");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "You are not allowed to view this page!"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
