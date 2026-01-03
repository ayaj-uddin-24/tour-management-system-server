/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServices.createUser(req.body);

    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "User Created Successfully!", user });
  } catch (error: any) {
    next(error);
  }
};

export const userController = { createUser };
