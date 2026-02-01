import { IGenericErrorResponse } from "../interfaces/error.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const duplicateErrorHandler = (error: any): IGenericErrorResponse => {
  const matchedArr = error.message.match(/"([^"]*)"/);

  return {
    statusCode: 401,
    message: `${matchedArr[1]} is already exist!`,
  };
};
