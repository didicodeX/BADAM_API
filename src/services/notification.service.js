import * as notificationRepo from "../repositories/notification.repository.js";

export const createNotification = async (instructorId, message) => {
  return await notificationRepo.createNotification(instructorId, message);
};

export const getNotificationsByinstructorId = async (instructorId) => {
  return await notificationRepo.getNotificationsByinstructorId(instructorId);
};
