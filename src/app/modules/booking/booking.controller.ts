/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// Create Booking Controller
const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await BookingServices.createBooking(
      req.body,
      decodedToken.userId,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking Created Successfully!",
      data: result,
    });
  },
);

// Get Bookings Controller
const getBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.getBookings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Retrieved Successfully!",
      data: result.data,
      meta: result.meta,
    });
  },
);

// Update Booking Controller
const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.updateBooking(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking Updated Successfully!",
      data: result,
    });
  },
);

// Get Single Booking Controller
const getSingleBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.getSingleBooking(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Retrieved Successfully!",
      data: result,
    });
  },
);

// Delete Booking Controller
const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await BookingServices.deleteBooking(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Deleted Successfully!",
      data: null,
    });
  },
);

export const BookingController = {
  createBooking,
  updateBooking,
  getBookings,
  getSingleBooking,
  deleteBooking,
};
