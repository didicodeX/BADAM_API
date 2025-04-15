import  User from "../models/user.model.js"


// Crée et enregistre un nouvel utilisateur dans la base
export const saveUser = (userData) => {
  const user = new User(userData);
  return user.save();
};
