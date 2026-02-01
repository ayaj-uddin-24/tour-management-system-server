/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/error.types";

export const ValidationErrorHandler = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSources: any = [];
  const errors = Object.values(error.errors);
  errors.forEach((err: any) =>
    errorSources.push({
      path: err.path,
      message: err.message,
    }),
  );
  return {
    statusCode: 400,
    message: "Validation Error Occurred!",
  };
};
