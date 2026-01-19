import { IDivision } from "./division.interface";
import { model, Schema } from "mongoose";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Division = model<IDivision>("Division", divisionSchema);
