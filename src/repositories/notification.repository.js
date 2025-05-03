import { Notification } from "../models/notification.model.js";

export const createNotification = async (instructorId, message) => {
  return await Notification.create({ instructor: instructorId, message });
};

export const getNotificationsByinstructorId = async (instructorId) => {
  return await Notification.find({ instructor: instructorId }).sort({
    createdAt: -1,
  });
};
