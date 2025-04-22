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
                path: "formation",
                populate: {
                    path: "formateur",
                    select: "name email"
                }
            }
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
                path: "formation",
                populate: {
                    path: "formateur",
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
                path: "formation",
                populate: {
                    path: "formateur",
                    select: "name email",
                },
            },
        });
};

export const deleteRegistration = async (id) => {
    return await Registration.findByIdAndDelete(id);
  };
  