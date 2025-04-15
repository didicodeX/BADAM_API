import * as userRepo from "../repositories/user.repository.js"

export const getAllUsers = async () => {
    return await userRepo.getAllUsers();
  };