/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IErrorSources,
  IGenericErrorResponse,
} from "../interfaces/error.types";
import mongoose from "mongoose";

export const ValidationErrorHandler = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = [];
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
