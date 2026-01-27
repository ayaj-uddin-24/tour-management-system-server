import { IAuthProviders, IUser, Role } from "./user.interface";
import AppError from "../../error/AppError";
import { envVars } from "../../config/env";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

// Create User Service
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  // const isUserExist = await User.findOne({ email });

  // if (isUserExist) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
  // }

  const hashPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProviders = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

// Update User Service
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exits!");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

// Get All Users Service
const getAllUsers = async () => {
  const user = await User.find();
  const allUsers = await User.countDocuments();

  return {
    data: user,
    meta: allUsers,
  };
};

export const userServices = { createUser, getAllUsers, updateUser };
