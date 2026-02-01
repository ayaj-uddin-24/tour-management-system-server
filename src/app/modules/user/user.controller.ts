/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/catchAsync.js";
import { userServices } from "./user.service.js";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// Create User Controller
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Created Successfully!",
      data: user,
    });
  },
);

// Update User Controller
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await userServices.updateUser(
      userId,
      req.body,
      req.user as JwtPayload,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Updated Successfully!",
      data: user,
    });
  },
);

// Get All Users Controller
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users Retrieved Created Successfully!",
      data: result.data,
      meta: {
        total: result.meta,
      },
    });
  },
);

export const userController = { createUser, getAllUsers, updateUser };
