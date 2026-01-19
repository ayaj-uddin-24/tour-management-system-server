/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { tourServices } from "./tour.service";
import httpStatus from "http-status-codes";

/* ==================== Tour Type Controller ==================== */
// Create Tour Type Controller
const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.createTourType(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour Type Created Successfully!",
      data: result,
    });
  },
);

// Get Tour Types Controller
const getTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.getTourTypes();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Types Retrieved Successfully!",
      data: result,
    });
  },
);

// Update Tour Type Controller
const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.updateTourType(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour Type Updated Successfully!",
      data: result,
    });
  },
);

// Delete Tour Type Controller
const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await tourServices.deleteTourType(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Type Deleted Successfully!",
      data: null,
    });
  },
);

/* ==================== Tour Controller ==================== */
// Create Tour Controller
const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.createTour(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour Created Successfully!",
      data: result,
    });
  },
);

// Update Tour Controller
const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.updateTourType(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Tour Updated Successfully!",
      data: result,
    });
  },
);

// Get Tour Controller
const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.getTour();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Retrieved Successfully!",
      data: result,
    });
  },
);

// Get Tour By ID Controller
const getTourByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourServices.getTourByID(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Retrieved Successfully!",
      data: result,
    });
  },
);

// Delete Tour Controller
const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await tourServices.deleteTour(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tour Deleted Successfully!",
      data: null,
    });
  },
);

export const tourController = {
  createTourType,
  updateTourType,
  getTourTypes,
  deleteTourType,
  createTour,
  updateTour,
  getTour,
  getTourByID,
  deleteTour,
};
