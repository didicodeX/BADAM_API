import * as  reviewService from "../../../services/review.service.js";

export default function reviewGateway(socket, io) {
  socket.on("new_review", async ({ trainingId, comment, rating, userId }) => {
    try {
      const data = { comment, rating };

      const review = await reviewService.createReview(data, trainingId, userId);

      // Tu peux limiter à une room spécifique si besoin (ex: une salle par trainingId)
      io.emit("review_posted", review); // ou: io.to(trainingId).emit(...)
    } catch (err) {
      console.error("❌ Review Socket Error:", err.message);
      socket.emit("review_error", { message: err.message });
    }
  });
}