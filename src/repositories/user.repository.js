import { User } from "../models/user.model.js";

export const getAllUsers = () => User.find();

export const getUser = (id) => {
  return User.findById(id).select("-password");
};

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUser = (id, updatedData) => {
  return User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

export const findByEmail = (email) => {
  return User.findOne({ email });
};

export const findById = async (id) => {
  return await User.findById(id);
};
