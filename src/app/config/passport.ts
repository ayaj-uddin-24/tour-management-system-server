import passport, { DoneCallback } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model.js";
import { IUser, Role } from "../modules/user/user.interface.js";

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
