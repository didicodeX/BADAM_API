import * as userRepo from "../repositories/user.repository.js";
import bcrypt from "bcrypt"

export const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

export const getUser = async (id) => {
  return await userRepo.getUser(id);
};

export const createUser = async (userData) => {
  const existingUser = await userRepo.findByEmail(userData.email);
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  return await userRepo.createUser(userData);
};

export const updateUser = async (id, updatedData) => {
  const user = await userRepo.findById(id);
  if (!user) throw new Error("Utilisateur introuvable");

  // Si un mot de passe est fourni, on le hash ici
  if (updatedData.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.password = await bcrypt.hash(updatedData.password, salt);
  }

  return await userRepo.updateUser(id, updatedData);
};

export const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};
