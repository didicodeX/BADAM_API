import { Registration } from "../models/registration.model.js";

export const createRegistration = async (data) => {
  return await Registration.create(data);
};

export const getRegistrations = async () => {
  return await Registration.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "session",
      populate: {
        path: "training",
        populate: {
          path: "instructor",
          select: "name email",
        },
      },
    });
};

export const getRegistrationsByUserId = async (userId) => {
  return await Registration.find({ user: userId })
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "session",
      populate: {
        path: "training",
        populate: {
          path: "instructor",
          select: "name email",
        },
      },
    });
};

export const getRegistrationsBySessionId = async (sessionId) => {
  return await Registration.find({ session: sessionId })
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "session",
      populate: {
        path: "training",
        populate: {
          path: "instructor",
          select: "name email",
        },
      },
    });
};

export const getRegistrationByUserAndSession = async (userId, sessionId) => {
  return await Registration.findOne({
    user: userId,
    session: sessionId,
  });
};

export const deleteRegistration = async (id) => {
  return await Registration.findByIdAndDelete(id);
};
