import { notificationRepository } from "../repositories/notification.repository.js";
import { io } from "../socket/index.js";

export const notificationService = {
  createNotification: async (recipientId, message, link = null) => {
    const notif = await notificationRepository.create({
      recipient: recipientId,
      message,
      link,
    });

    io.to(recipientId.toString()).emit("new_notification", {
      message,
      link,
      timestamp: notif.createdAt,
    });
    console.log("Notification envoyée à l'utilisateur :", recipientId);
    console.log("Notification :", notif);
    return notif;
  },

  getUserNotifications: async (userId) => {
    return await notificationRepository.findByUser(userId);
  },

  markNotificationAsRead: async (notificationId) => {
    return await notificationRepository.markAsRead(notificationId);
  },

  deleteNotification: async (notificationId) => {
    return await notificationRepository.delete(notificationId);
  },
};
