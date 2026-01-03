/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);

    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "User Created Successfully!", user });
  } catch (error: any) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export const userController = { createUser };
