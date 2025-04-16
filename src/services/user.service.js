import * as userRepo from "../repositories/user.repository.js"

export const getAllUsers = async () => {
    return await userRepo.getAllUsers();
  };

export const getUserById = async(id) =>{
    return await userRepo.getUserById(id);
}

export const createUser = async (userData) => {
    const existingUser = await userRepo.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }
  
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  
    return await userRepo.createUser(userData);
  };

  export const updateUserById = async (id, updatedData) => {
    return await userRepo.updateUserById(id, updatedData);
  };

  export const deleteUserById = (id) => {
    return userRepo.deleteUserById(id);
  };