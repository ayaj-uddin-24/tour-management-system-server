import AppError from "../../error/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!");
  }

  const matchPassword = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!matchPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password!");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, "secret", {
    expiresIn: "1d",
  });

  return { isUserExist, accessToken };
};

export const authServices = { credentialsLogin };
