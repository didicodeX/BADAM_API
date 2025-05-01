import * as NotificationService from "../services/notification.service.js";

export const getNotificationsByFormateurId = async (req, res) => {
  try {
    const notifications = await NotificationService.getNotificationsByFormateurId(req.params.formateurId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
