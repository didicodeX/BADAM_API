import * as userService from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({
      message: "Compte créé avec succès",
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    const id = req.user.id;
    const updatedData = req.body;

    // 👇 Gestion avatar (un seul fichier)
    if (req.file) {
      updatedData.avatar = req.file.path;
    }

    const updatedUser = await userService.updateUser(id, updatedData);

    res.json({ message: "Profil mis à jour avec succès", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // gestion de l'image
    if (req.file) {
      updatedData.avatar = req.file.path;
    }

    const updatedUser = await userService.updateUser(id, updatedData);

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
export const deleteUserByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
