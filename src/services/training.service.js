import * as trainingRepo from "../repositories/training.repository.js";

export const createTraining = async (data, id) => {
  return await trainingRepo.createTraining(data, id);
};

export const getAllTraining = async () => {
  return await trainingRepo.getAllTraining();
};

export const getTraining = async (id) => {
  return await trainingRepo.getTraining(id);
};

export const getTrainingsCreateByUser = async (userId) => {
  return await trainingRepo.getTrainingsCreateByUser(userId);
};

export const getTrainingsByUser = async (userId) => {
  const registrations = await trainingRepo.getTrainingsByUser(userId);

  // Extraire les Trainings depuis les sessions des inscriptions
  const trainings = registrations
    .map((reg) => reg.session?.training)
    .filter((training) => training); // s'assurer que ce n’est pas null

  // Supprimer les doublons si nécessaire (même formation dans plusieurs sessions)
  const uniqueTrainings = Array.from(
    new Map(trainings.map((f) => [f._id.toString(), f])).values()
  );

  return uniqueTrainings;

};

export const updateTraining = async (id, data) => {
  return await trainingRepo.updateTraining(id, data);
};

export const deleteTraining = async (id) => {
  return await trainingRepo.deleteTraining(id);
};

export const getReviewByTrainingId = async (TrainingId) => {
  return await trainingRepo.getReviewByTrainingId(TrainingId);
};
