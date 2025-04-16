import { Formation } from "../models/formation.model.js";

export const createFormation = async (data) => {
  return await Formation.create(data);
};

export const getAllFormation = async () => {
  return await Formation.find().populate({
    path: "formateur",
    select: "name -_id",
  });
};

export const getFormation = async (id) => {
  return await Formation.findById(id).populate({
    path: "formateur",
    select: "name -_id",
  });
};

export const updateFormation = async (id, data) => {
  return await Formation.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteFormation = async (id) => {
  return await Formation.findByIdAndDelete(id);
};
