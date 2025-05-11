import { Notification } from "../models/notification.model.js";

export const notificationRepository = {
  create: async (data) => {
    return await Notification.create(data);
  },

  findByUser: async (userId) => {
    return await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });
  },

  markAsRead: async (notificationId) => {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  },

  delete: async (notificationId) => {
    return await Notification.findByIdAndDelete(notificationId);
  },
};
