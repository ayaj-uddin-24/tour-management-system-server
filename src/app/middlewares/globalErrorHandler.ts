/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import { envVars } from "../config/env";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = error.message;

  // Duplicate Error
  if (error.code === 11000) {
    const matchedArr = error.message.match(/"([^"]*)"/);
    statusCode = 401;
    message = `${matchedArr[1]} is already exist!`;
  }

  // Mongoose Cast Error
  else if (error.name === "CastError") {
    statusCode = 401;
    message = "Invalid ObjectID. Give a valid ObjectID!";
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
