import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import { envVars } from "../config/env";

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

      req.user = verifiedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
