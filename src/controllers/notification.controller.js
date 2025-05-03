import * as NotificationService from "../services/notification.service.js";

export const getNotificationsByinstructorId = async (req, res) => {
  try {
    const notifications =
      await NotificationService.getNotificationsByinstructorId(
        req.params.instructorId
      );
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
