import { IAuthProviders, IUser } from "./user.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

// Create User Service
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!");
  }

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

// Get All Users Service
const getAllUsers = async () => {
  const user = await User.find();
  const allUsers = await User.countDocuments();

  return {
    data: user,
    meta: allUsers,
  };
};

export const userServices = { createUser, getAllUsers };
