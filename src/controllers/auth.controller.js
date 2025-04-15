import * as authService from '../services/auth.service.js';

// Contrôleur qui gère la requête HTTP POST /register
export const registerHandler = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    // Retourne un succès avec les données
    res.status(200).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await authService.login(email, password);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // Passe à true si tu es en HTTPS
        sameSite: "None", // "None" si tu veux tester avec frontend séparé
        maxAge: 24 * 60 * 60 * 1000, // 1 jour
      });
      

    res.status(200).json({
      message: "Connexion réussie!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: "localhost", // ou ton domaine de production
    });

    res.json({ message: "User logged out." });
};

export const profile = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};