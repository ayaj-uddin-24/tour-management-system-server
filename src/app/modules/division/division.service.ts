import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status-codes";

// Create Division Service
const createDivision = async (payload: Partial<IDivision>) => {
  const { name, slug, thumbnail, description } = payload;

  const isDivisionExist = await Division.findOne({ name });
  if (isDivisionExist) {
    throw new AppError(httpStatus.CONFLICT, "Division Already Exists!");
  }

  const division = await Division.create({
    name,
    slug,
    thumbnail,
    description,
  });

  return division;
};

// Get Divisions Service
const getDivisions = async () => {
  const divisions = await Division.find();
  return divisions;
};

// Update Division Service
const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const { name, slug, thumbnail, description } = payload;

  const isDivisionExist = await Division.findById(id);
  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Does Not Exist!");
  }

  const division = await Division.findByIdAndUpdate(id, {
    name,
    slug,
    thumbnail,
    description,
  });

  return division;
};

// Get Division By ID Service
const getDivisionById = async (id: string) => {
  const division = await Division.findById(id);
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
  getDivisionById,
  deleteDivision,
};
