import { Registration } from "../models/registration.model.js";
import mongoose from "mongoose";
// export const createRegistration = async (data) => {
//   return await Registration.create(data);
// };

export const createRegistration = async ({ session, participant }) => {
  return await Registration.create({ session, participant });
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
  const participantId = new mongoose.Types.ObjectId(userId);

  const registrations = await Registration.aggregate([
    // 1. Filtrer les inscriptions par participant
    {
      $match: {
        participant: participantId,
        archived: false, 
      },
    },
    // 2. Joindre les sessions correspondantes
    {
      $lookup: {
        from: "sessions",
        localField: "session",
        foreignField: "_id",
        as: "session",
      },
    },
    { $unwind: "$session" },
    // 3. Calculer le nombre actuel de participants pour chaque session
    {
      $lookup: {
        from: "registrations",
        localField: "session._id",
        foreignField: "session",
        as: "session_registrations",
      },
    },
    {
      $addFields: {
        "session.currentNbParticipants": { $size: "$session_registrations" },
      },
    },
    // 4. Joindre les formations associées aux sessions
    {
      $lookup: {
        from: "trainings",
        localField: "session.training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $addFields: {
        "session.training": "$training",
      },
    },
    // 5. Structurer les données finales
    {
      $project: {
        registrationDate: 1,
        participant: 1,
        session: {
          _id: 1,
          startDateTime: 1,
          endDateTime: 1,
          maxParticipants: 1,
          address: 1,
          coverImage: 1,
          currentNbParticipants: 1,
          training: {
            _id: 1,
            title: 1,
            description: 1,
            images: 1,
          },
        },
      },
    },
  ]);

  return registrations;
};

export const getArchivedRegistrations = async (userId) => {
  const participantId = new mongoose.Types.ObjectId(userId);

  const registrations = await Registration.aggregate([
    // 1. Filtrer les inscriptions par participant
    {
      $match: {
        participant: participantId,
        archived: true, 
      },
    },
    // 2. Joindre les sessions correspondantes
    {
      $lookup: {
        from: "sessions",
        localField: "session",
        foreignField: "_id",
        as: "session",
      },
    },
    { $unwind: "$session" },
    // 3. Calculer le nombre actuel de participants pour chaque session
    {
      $lookup: {
        from: "registrations",
        localField: "session._id",
        foreignField: "session",
        as: "session_registrations",
      },
    },
    {
      $addFields: {
        "session.currentNbParticipants": { $size: "$session_registrations" },
      },
    },
    // 4. Joindre les formations associées aux sessions
    {
      $lookup: {
        from: "trainings",
        localField: "session.training",
        foreignField: "_id",
        as: "training",
      },
    },
    { $unwind: "$training" },
    {
      $addFields: {
        "session.training": "$training",
      },
    },
    // 5. Structurer les données finales
    {
      $project: {
        registrationDate: 1,
        participant: 1,
        session: {
          _id: 1,
          startDateTime: 1,
          endDateTime: 1,
          maxParticipants: 1,
          address: 1,
          coverImage: 1,
          currentNbParticipants: 1,
          training: {
            _id: 1,
            title: 1,
            description: 1,
            images: 1,
          },
        },
      },
    },
  ]);

  return registrations;
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

export const findRegistrationsForSession = (sessionId) => {
  return Registration.find({ session: sessionId })
    .select("participant")
    .populate("participant", "avatar name");
};
