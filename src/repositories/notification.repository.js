import { Notification } from "../models/notification.model.js";

export const createNotification = async (formateurId, message) => {
  return await Notification.create({ formateur: formateurId, message });
};

export const getNotificationsByFormateurId = async (formateurId) => {
  return await Notification.find({ formateur: formateurId }).sort({ createdAt: -1 });
};
