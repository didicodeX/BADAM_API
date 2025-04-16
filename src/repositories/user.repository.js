import  {User} from "../models/user.model.js"

export const getAllUsers = () => User.find();

export const getUserById = (id) => {
    return User.findById(id);
  };

  export const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
  };

  export const updateUserById = (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  };

  export const deleteUserById = (id) => {
    return User.findByIdAndDelete(id);
  };