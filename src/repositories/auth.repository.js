import { User } from "../models/user.model.js";

export const createUser = (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return await User.findById(userId).select("-password");
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};
