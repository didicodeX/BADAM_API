import * as userRepo from "../repositories/user.repository.js";

export const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

export const getUser = async (id) => {
  return await userRepo.getUserById(id);
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
  return await userRepo.updateUser(id, updatedData);
};

export const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};
