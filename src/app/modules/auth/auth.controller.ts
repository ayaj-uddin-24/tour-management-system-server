/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) return next(new AppError(401, err));

      if (!user) return next(new AppError(401, info.message));

      const userTokens = createUserTokens(user);

      const { password: pass, ...rest } = user.toObject();

      setAuthCookie(res, userTokens);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: rest,
        token: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
        },
      });
    })(req, res, next);
  },
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "Refresh Token Not Received!");
    }

    const tokenInfo = await authServices.getNewAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Access Token Created Successfully!",
      data: tokenInfo,
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Logged Out Successfully!",
      data: null,
    });
  },
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const payload = req.body;

    await authServices.resetPassword(decodedToken, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Changed Successfully!",
      data: null,
    });
  },
);

const googleCallBack = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);

    const redirectTo = (req.authInfo as { state?: string })?.state ?? "";
    const safeRedirect = redirectTo.startsWith("/") ? redirectTo.slice(1) : "";
    res.redirect(`${envVars.FRONTEND_URL}/${safeRedirect}`);
  },
);

export const authController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallBack,
};
