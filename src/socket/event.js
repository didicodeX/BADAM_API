import chatGateway from "./modules/chat/chat.gateway.js";
import reviewGateway from "./modules/review/review.gateway.js";
import notificationGateway from "./modules/notification/notification.gateway.js";

export default function registerSocketEvents(socket, io) {
  chatGateway(socket, io);
  reviewGateway(socket, io);
  notificationGateway(socket, io);
}
