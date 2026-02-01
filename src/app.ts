import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import express, { Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import expressSession from "express-session";
import { envVars } from "./app/config/env";
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
import passport from "passport";
import "./app/config/passport";
import cors from "cors";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "This is home route!" });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
