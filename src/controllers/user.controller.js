import * as userService from "../services/user.service.js"

export const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  export const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await userService.getUserById(id);
      
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
        message: "Utilisateur créé avec succès",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  export const updateUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
  
      const updatedUser = await userService.updateUserById(id, updatedData);
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  };

  export const deleteUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedUser = await userService.deleteUserById(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  };