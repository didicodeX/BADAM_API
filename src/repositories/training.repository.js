import { Training } from "../models/training.model.js";
import { Session } from "../models/session.model.js";
import { Registration } from "../models/registration.model.js";
import { Review } from "../models/review.model.js";

export const createTraining = async (data, id) => {
  return await Training.create({ ...data, instructor: id });
};

export const getAllTraining = async () => {
  return await Training.find().populate({
    path: "instructor",
    select: "name -_id",
  });
};

export const getTraining = async (id) => {
  return await Training.findById(id).populate({
    path: "instructor",
    select: "name -_id",
  });
};

export const getTrainingImages = async (id) => {
  return await Training.findById(id).populate({
    path: "instructor",
    select: "images",
  });
};

export const getTrainingsCreateByUser = async (userId) => {
  return await Training.find({ instructor: userId }).populate(
    "instructor",
    "name bio"
  );
};

export const getTrainingsByUser = async (userId) => {
  return await Training.find({ instructor: userId });
};

export const updateTraining = async (id, data) => {
  return await Training.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteTraining = async (id) => {
  return await Training.findByIdAndDelete(id);
};

export const getReviewByTrainingId = async (trainingId) => {
  const sessions = await Session.find({ training: trainingId }).select("_id");
  console.log("Sessions trouvées:", sessions);

  const sessionIds = sessions.map((s) => s._id);
  const review = await Review.find({ session: { $in: sessionIds } })
    .populate({
      path: "session",
      select: "startDateTime endDateTime status",
    })
    .select("comment rating dateReview session");
};

export const getTrainingWithInstructorId = async (id) => {
  return await Training.findById(id).populate({
    path: "instructor",
    select: "name avatar", // 👈 on inclut _id par défaut ici
  });
};
