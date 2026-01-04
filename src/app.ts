import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import express, { Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "This is home route!" });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
