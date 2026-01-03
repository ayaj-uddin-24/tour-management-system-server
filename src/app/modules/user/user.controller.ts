/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "./user.model.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

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
