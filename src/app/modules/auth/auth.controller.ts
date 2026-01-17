/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { setAuthCookie } from "../../utils/setCookie";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.credentialsLogin(req.body);

    setAuthCookie(res, result.token);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login Successfully!",
      data: result.data,
      token: result.token,
    });
  }
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
  }
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
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const payload = req.body;

    await authServices.resetPassword(decodedToken, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Changed Successfully!",
      data: null,
    });
  }
);

export const authController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
};
