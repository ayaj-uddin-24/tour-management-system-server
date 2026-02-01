/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorResponse } from "../interfaces/error.types";

export const duplicateErrorHandler = (error: any): IGenericErrorResponse => {
  const matchedArr = error.message.match(/"([^"]*)"/);
  return {
    statusCode: 401,
    message: `${matchedArr[1]} is already exist!`,
  };
};
