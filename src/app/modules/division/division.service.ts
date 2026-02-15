import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";

// Create Division Service
const createDivision = async (payload: Partial<IDivision>) => {
  const isDivisionExist = await Division.findOne({ name: payload.name });
  if (isDivisionExist) {
    throw new AppError(httpStatus.CONFLICT, "Division Already Exists!");
  }

  const division = await Division.create(payload);

  return division;
};

// Get Divisions Service
const getDivisions = async () => {
  const divisions = await Division.find({});
  const totalDivisions = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      totalData: totalDivisions,
    },
  };
};

// Update Division Service
const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const isDivisionExist = await Division.findById(id);
  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Does Not Exist!");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A division with this name already exists.",
    );
  }

  const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
  payload.slug = `${baseSlug}-division`;

  const division = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return division;
};

// Get Single Division Service
const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return division;
};

// Delete Division Service
const deleteDivision = async (id: string) => {
  const division = await Division.findById(id);
  if (!division) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found!");
  }

  await Division.findByIdAndDelete(id);
  return null;
};

export const divisionServices = {
  createDivision,
  updateDivision,
  getDivisions,
  getSingleDivision,
  deleteDivision,
};
