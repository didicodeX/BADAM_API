import { User } from "../models/user.model.js";

export const saveUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

export const findUserById = async (userId) => {
  return await User.findById(userId).select("-password");
};
