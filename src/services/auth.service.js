import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositories/auth.repository.js";
import * as userService from "../services/user.service.js";

export const register = async (userData) => {
// Utiliser le service user
  return await userService.createUser(userData);
};

export const login = async (email, password) => {
  const existUser = await authRepo.findByEmail(email);

  if (!existUser) throw new Error("Utilisateur introuvable");

  const isPasswordCorrect = bcrypt.compare(password, existUser.password);
  if (!isPasswordCorrect) throw new Error("Mot de passe incorrect");

  const accessToken = jwt.sign(
    {
      id: existUser._id,
      email: existUser.email,
      name: existUser.name,
      roles: existUser.roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user: existUser, accessToken };
};

export const getMe = async (userId) => {
  return await authRepo.findUserById(userId);
};
