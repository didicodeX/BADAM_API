import * as formationRepo from "../repositories/formation.repository.js";

export const createFormation = async (data) => {
  return await formationRepo.createFormation(data);
};

export const getAllFormation = async () => {
  return await formationRepo.getAllFormation();
};

export const getFormation = async (id) => {
  return await formationRepo.getFormation(id);
};

export const updateFormation = async (id, data) => {
  return await formationRepo.updateFormation(id, data);
};

export const deleteFormation = async (id) => {
  return await formationRepo.deleteFormation(id);
};
