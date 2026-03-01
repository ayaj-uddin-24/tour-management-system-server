import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";

const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

// Create Booking Service
const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const user = await User.findById(userId);
  if (!user?.phone && !user?.address) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Update your phone and address to book a tour",
    );
  }

  const booking = await Booking.create({
    user: userId,
    status: BOOKING_STATUS.PENDING,
    ...payload,
  });

  const tour = await Tour.findById(payload.tour).select("costFrom");
  if (!tour?.costFrom) {
    throw new AppError(httpStatus.NOT_FOUND, "Cost not found in tour");
  }

  const amount = Number(tour.costFrom) * Number(payload.guestCount);

  const payment = await Payment.create({
    booking: booking._id,
    transactionId: getTransactionId(),
    status: PAYMENT_STATUS.UNPAID,
    amount: amount,
  });

  const updateBooking = await Booking.findByIdAndUpdate(booking._id, {
    payment: payment._id,
  });

  return updateBooking;
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
