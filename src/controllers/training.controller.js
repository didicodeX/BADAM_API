import * as trainingService from "../services/training.service.js";

export const createTraining = async (req, res) => {
  const { id } = req.user;
  try {
    const { title, description, images, videos } = req.body;

    const training = await trainingService.createTraining(
      { title, description, images, videos },
      id
    );

    res
      .status(201)
      .json({ training, message: "Formation créée avec succès !" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createTrainingMulter = async (req, res) => {
  const { id } = req.user;
  try {
    console.log(req.files);

    const images = (req.files?.images || []).map((file) => file.path);
    const videos = (req.files?.videos || []).map((file) => file.path);

    req.body.images = images;
    req.body.videos = videos;
    const training = await trainingService.createTraining(req.body, id);
    res.status(201).json(training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTraining = async (req, res) => {
  try {
    const trainings = await trainingService.getAllTraining();
    res.status(201).json(trainings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const training = await trainingService.getTraining(id);

    if (!training) {
      return res.status(404).json({ message: "formation non trouvée" });
    }

    res.status(200).json(training);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTrainingsCreateByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const trainings = await trainingService.getTrainingsCreateByUser(userId);
    if (!trainings) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingsByUser = async (req, res) => {
  const userId = req.params;

  try {
    const Trainings = await trainingService.getTrainingsByUser(userId);
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

    const updatedTraining = await trainingService.updateTraining(
      id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedTraining) {
      return res.status(404).json({ message: "formation non trouvée" });
    }

    res
      .status(200)
      .json({
        message: "Formation modifiée avec succès",
        training: updatedTraining,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTraining = await trainingService.deleteTraining(id);

    if (!deletedTraining) {
      return res.status(404).json({ message: "formation non trouvée" });
    }

    res.status(200).json({ message: "formation supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const review = await trainingService.getReviewByTrainingId(trainingId);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
