import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { IUser, Role } from "../modules/user/user.interface.js";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model.js";
import passport, { DoneCallback } from "passport";
import bcryptjs from "bcryptjs";
import { envVars } from "./env";

// Custom Login Authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) return done("User does not exist!");

      const isGoogleAuthenticated = isUserExist.auths?.some(
        (providerObjects) => providerObjects.provider === "google",
      );

      if (isGoogleAuthenticated && !isUserExist.password) {
        return done(
          "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password.",
        );
      }

      const matchPassword = await bcryptjs.compare(
        password as string,
        isUserExist.password as string,
      );

      if (!matchPassword) return done("Incorrect password!");

      return done(null, isUserExist, { message: "User login successful!" });
    },
  ),
);

// Google Login Authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
      callbackURL: envVars.GOOGLE_REDIRECT_URI,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value ?? null;
        if (!email) return done(null, false);

        let user = await User.findOne({ email: email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            picture: profile.photos?.[0]?.value,
            role: Role.USER,
            isVerified: true,
            auths: [{ provider: "google", providerId: profile.id }],
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: Partial<IUser>, done: DoneCallback) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: DoneCallback) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
