import { Response } from "express";

interface IMeta {
  total: number;
}

interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
  token?: IToken;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
    token: data.token,
  });
};

export default sendResponse;
