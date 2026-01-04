/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service.js";
import catchAsync from "../../utils/catchAsync.js";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);

    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "User Created Successfully!", user });
  }
);

export const userController = { createUser };
