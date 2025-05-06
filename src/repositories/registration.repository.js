import { Registration } from "../models/registration.model.js";

// export const createRegistration = async (data) => {
//   return await Registration.create(data);
// };

export const createRegistration = async ({ participant, session }) => {
  return await Registration.create({ participant, session });
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
  return await Registration.find({ participant: userId })
  .populate("session","startDateTime endDateTime maxParticipants address");
};

export const getRegistrationsBySessionId = async (sessionId) => {
  return await Registration.find({ session: sessionId })
    .populate({
      path: "participant",
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
    participant: userId,
    session: sessionId,
  });
};

export const deleteRegistration = async (id) => {
  return await Registration.findByIdAndDelete(id);
};
