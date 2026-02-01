import { IGenericErrorResponse } from "../interfaces/error.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const zodErrorHandler = (err: any): IGenericErrorResponse => {
  const errorSources: any = [];
  err.issues.forEach((err: any) => {
    errorSources.push({
      path: err.path[0],
      message: err.message,
    });
  });
  return {
    statusCode: 400,
    message: "Zod Error",
  };
};
