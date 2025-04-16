import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositories/auth.repository.js";

export const register = async (userData) => {
  // Vérifie si l'utilisateur existe déjà
  const existingUser = await authRepo.findByEmail(userData.email);
  if (existingUser) throw new Error("Email already registered");

  // Hashage sécurisé du mot de passe
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  // Enregistre l'utilisateur avec le mot de passe haché
  return await authRepo.createUser(userData);
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
      role: existUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { user: existUser, accessToken };
};

export const getMe = async (userId) => {
  return await authRepo.findUserById(userId);
};
