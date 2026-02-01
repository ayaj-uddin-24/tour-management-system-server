/* eslint-disable no-console */

import { IAuthProviders, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "../config/env";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const superAdmin = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (superAdmin) {
      console.log("Super Admin Already Exist!");
      return;
    }

    console.log("Trying To Create Super Admin!");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND),
    );

    const authProvider: IAuthProviders = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: Partial<IUser> = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      role: Role.SUPER_ADMIN,
      auths: [authProvider],
    };

    await User.create(payload);
    console.log("Created Super Admin Successfully!");
  } catch (error) {
    console.log(error);
  }
};
