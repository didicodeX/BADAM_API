import * as TrainingService from "../services/Training.service.js";

export const createTraining = async (req, res) => {
  const { id } = req.user;
  try {
    console.log(req.files);

    const images = (req.files?.images || []).map((file) => file.path);
    const videos = (req.files?.videos || []).map((file) => file.path);

    req.body.images = images;
    req.body.videos = videos;
    const Training = await TrainingService.createTraining(req.body, id);
    res.status(201).json(Training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTraining = async (req, res) => {
  try {
    const Trainings = await TrainingService.getAllTraining();
    res.status(201).json(Trainings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const Training = await TrainingService.getTraining(id);

    if (!Training) {
      return res.status(404).json({ message: "Training non trouvée" });
    }

    res.status(200).json(Training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCreateTrainingsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const Trainings = await TrainingService.getTrainingsCreateByUser(userId);
    if (!Trainings) {
      return res.status(404).json({ message: "Training non trouvée" });
    }
    res.status(200).json(Trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingsByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const Trainings = await TrainingService.getTrainingsByUser(userId);
    res.status(200).json(Trainings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des Trainings", error });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedTraining = await TrainingService.updateTraining(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedTraining) {
      return res.status(404).json({ message: "Training non trouvée" });
    }

    res.status(200).json(updatedTraining);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTraining = await TrainingService.deleteTraining(id);

    if (!deletedTraining) {
      return res.status(404).json({ message: "Training non trouvée" });
    }

    res.status(200).json(deleteTraining, {
      message: "Training supprimée avec succès",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByTraining = async (req, res) => {
  try {
    const TrainingId = req.params.id;
    const Review = await TrainingService.getReviewByTrainingId(TrainingId);
    res.status(200).json(Review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
