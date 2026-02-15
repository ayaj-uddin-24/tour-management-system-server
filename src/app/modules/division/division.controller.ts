/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { divisionServices } from "./division.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status-codes";

// Create Division Controller
const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.createDivision(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Division Created Successfully!",
      data: result,
    });
  },
);

// Get Divisions Controller
const getDivisions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.getDivisions();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Retrieved Successfully!",
      data: result.data,
      meta: result.meta,
    });
  },
);

// Update Division Controller
const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.updateDivision(
      req.params.id,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Division Updated Successfully!",
      data: result,
    });
  },
);

// Get Single Division Controller
const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divisionServices.getSingleDivision(req.params.slug);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Retrieved Successfully!",
      data: result,
    });
  },
);

// Delete Division Controller
const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await divisionServices.deleteDivision(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Division Deleted Successfully!",
      data: null,
    });
  },
);

export const divisionController = {
  createDivision,
  updateDivision,
  getDivisions,
  getSingleDivision,
  deleteDivision,
};
