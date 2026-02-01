import { IGenericErrorResponse } from "../interfaces/error.types";

export const castErrorHandler = (): IGenericErrorResponse => {
  return {
    statusCode: 401,
    message: "Invalid ObjectID. Give a valid ObjectID!",
  };
};
