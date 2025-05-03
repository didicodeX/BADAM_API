import * as ReviewService from "../services/review.service.js";

export const createReview = async (req, res) => {
  const { id: userId } = req.user;
  const { sessionId } = req.params;

  try {
    const Review = await ReviewService.createReview(
      req.body,
      sessionId,
      userId
    );
    res.status(201).json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllReview = async (req, res) => {
  try {
    const Review = await ReviewService.getAllReview();
    res.json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const Review = await ReviewService.getReview(id);

    if (!Review) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByTraining = async (req, res) => {
  try {
    const id = req.params.TrainingId;
    const Review = await ReviewService.getReviewByTraining(id);

    if (!Review) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const Review = await ReviewService.getReviewByUser(id);

    if (!Review) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewBySession = async (req, res) => {
  try {
    const id = req.params.sessionId;
    const Review = await ReviewService.getReviewBySession(id);

    if (!Review) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(Review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedReview = await ReviewService.updateReview(id, updatedData, {
      new: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReview = await ReviewService.deleteReview(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review non trouvée" });
    }

    res
      .status(200)
      .json(deleteReview, { message: "Review supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewTopRatedBYSession = async (id) => {
  return await Session.findOneById(id);
};

export const getTopRatedTrainings = async (req, res) => {
  try {
    const topTrainings = await ReviewService.getTopRatedTrainings();
    res.status(200).json(topTrainings);
  } catch (error) {
    console.error("Erreur complète :", error); // <--- très important pour debugger
    res.status(500).json({ error: error.message }); // renvoie le message réel
  }
};

export const getTopRatedSessions = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const sessions = await ReviewService.getTopRatedSessions(limit);
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
