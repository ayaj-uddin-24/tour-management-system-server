import { IUser } from "./user.interface";
import { User } from "./user.model";

// Create User Service
const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({ name, email });

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
