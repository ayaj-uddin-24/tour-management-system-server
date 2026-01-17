/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { generateToken, verifyToken } from "../../utils/jwt";
import { createUserTokens } from "../../utils/userTokens";
import { IsActive, IUser } from "../user/user.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

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

  const userTokens = createUserTokens(isUserExist);

  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    data: rest,
    token: {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
    },
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!");
  }

  if (
    isUserExist.isActive === IsActive.BLOCKED ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }

  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};

const resetPassword = async (
  decodedToken: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(decodedToken.userId);
  const isPasswordMatch = await bcryptjs.compare(
    payload.oldPassword,
    user!.password as string
  );

  if (isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password Does Not Match!");
  }

  const hashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user!.password = hashedPassword;
  user!.save();

  return;
};

export const authServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
