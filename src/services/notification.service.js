import * as NotificationRepo from "../repositories/notification.repository.js";

export const createNotification = async (formateurId, message) => {
  return await NotificationRepo.createNotification(formateurId, message);
};

export const getNotificationsByFormateurId = async (formateurId) => {
  return await NotificationRepo.getNotificationsByFormateurId(formateurId);
};
