/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import { envVars } from "../config/env";
import { duplicateErrorHandler } from "../helpers/duplicateErrorHandler";
import { castErrorHandler } from "../helpers/castErrorHandler";
import { ValidationErrorHandler } from "../helpers/validationErrorHandler";
import { zodErrorHandler } from "../helpers/zodErrorHandler";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = error.message;
  const errorSources: any = [];

  // Duplicate Error
  if (error.code === 11000) {
    const simplifiedError = duplicateErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Mongoose Cast Error
  else if (error.name === "CastError") {
    const simplifiedError = castErrorHandler();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Mongoose Validation Error
  else if (error.name === "ValidationError") {
    const simplifiedError = ValidationErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Zod Error
  else if (error.name === "ZodError") {
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
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
    errorSources,
    error: envVars.NODE_ENV === "development" ? error.stack : null,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
