import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";

/* ==================== Tour Type Services ==================== */
// Create Tour Type Service
const createTourType = async (payload: Partial<ITourType>) => {
  const isTourTypeExist = await TourType.findOne({ name: payload.name });
  if (isTourTypeExist) {
    throw new AppError(httpStatus.CONFLICT, "Tour Type Already Exists!");
  }

  const tourType = await TourType.create(payload);

  return tourType;
};

// Get Tour Type Service
const getTourTypes = async () => {
  const tourTypes = await TourType.find({});
  const totalTourTypes = await TourType.countDocuments();
  return {
    data: tourTypes,
    meta: {
      total: totalTourTypes,
    },
  };
};

// Update Tour Type Service
const updateTourType = async (id: string, payload: Partial<ITourType>) => {
  const isTourTypeExist = await TourType.findById(id);
  if (!isTourTypeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type Does Not Exists!");
  }

  const tourType = await TourType.findByIdAndUpdate(id, payload);

  return tourType;
};

// Delete Tour Type Service
const deleteTourType = async (id: string) => {
  const tourType = await TourType.findById(id);
  if (!tourType) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type Not Found!");
  }

  await TourType.findByIdAndDelete(id);
  return null;
};

/* ==================== Tour Services ==================== */
// Create Tour Service
const createTour = async (payload: Partial<ITour>) => {
  const { title, ...rest } = payload;

  const slug = title?.toLowerCase().split(" ").join("-");
  payload.slug = slug;

  const isTourExist = await Tour.findOne({ slug });
  if (isTourExist) {
    throw new AppError(httpStatus.CONFLICT, "Tour Already Exists!");
  }

  const tour = await Tour.create({ title, slug, ...rest });

  return tour;
};

// Update Tour Service
const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);
  if (!isTourExist) {
    throw new AppError(httpStatus.CONFLICT, "Tour Type Does Not Exists!");
  }

  const tour = await Tour.findByIdAndUpdate(id, payload);

  return tour;
};

// Get Tours Service
const getTour = async () => {
  const tour = await Tour.find({})
    .populate("tourType", "name")
    .populate("division", { name: 1, description: 1 });
  const totalTours = await Tour.countDocuments();
  return {
    data: tour,
    meta: {
      total: totalTours,
    },
  };
};

// Get Tour By ID Service
const getTourByID = async (id: string) => {
  const tour = await Tour.findById(id)
    .populate("tourType")
    .populate("division");
  if (!tour) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Does Not Exits!");
  }
  return tour;
};

// Delete Tour Service
const deleteTour = async (id: string) => {
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Not Found!");
  }

  await TourType.findByIdAndDelete(id);
  return null;
};

export const tourServices = {
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
