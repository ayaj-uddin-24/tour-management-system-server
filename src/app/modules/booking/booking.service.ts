import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

// Create Booking Service
const createBooking = async (payload: Partial<IBooking>) => {
  const booking = await Booking.create(payload);
  return booking;
};

// Get Bookings Service
const getBookings = async () => {
  const bookings = await Booking.find({});
  const totalBookings = await Booking.countDocuments();

  return {
    data: bookings,
    meta: {
      totalData: totalBookings,
    },
  };
};

// Update Booking Service
const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  const booking = await Booking.findByIdAndUpdate(id, payload);
  return booking;
};

// Get Single Booking Service
const getSingleBooking = async (id: string) => {
  const booking = await Booking.findById(id);
  return booking;
};

// Delete Booking Service
const deleteBooking = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking Not Found!");
  }

  await Booking.findByIdAndDelete(id);
  return null;
};

export const BookingServices = {
  createBooking,
  updateBooking,
  getBookings,
  getSingleBooking,
  deleteBooking,
};
