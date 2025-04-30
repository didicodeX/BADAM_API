import * as authService from "../services/auth.service.js";
import { cookieOptions } from "../config/cookie.config.js";

// Contrôleur qui gère la requête HTTP POST /register
export const register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    // Retourne un succès avec les données
    res.status(200).json({
      message: "Inscription réussie!",
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await authService.login(email, password);

    res.cookie("accessToken", accessToken, cookieOptions);

    res.status(200).json({
      message: "Connexion réussie!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", cookieOptions);

  res.json({ message: "Déconnexion réussie!" });
};

export const profile = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
