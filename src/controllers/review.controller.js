import * as reviewService from "../services/review.service.js";

export const createReview = async (req, res) => {
  const { id: userId } = req.user;
  const { sessionId } = req.params;

  try {
    const review = await reviewService.createreview(
      req.body,
      sessionId,
      userId
    );
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllReview = async (req, res) => {
  try {
    const review = await reviewService.getAllReview();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewService.getReview(id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByTraining = async (req, res) => {
  try {
    const id = req.params.TrainingId;
    const review = await reviewService.getReviewByTraining(id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewByUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const review = await reviewService.getReviewByUser(id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewBySession = async (req, res) => {
  try {
    const id = req.params.sessionId;
    const review = await reviewService.getReviewBySession(id);

    if (!review) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedReview = await reviewService.updateReview(id, updatedData, {
      new: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReview = await reviewService.deleteReview(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Avis non trouvée" });
    }

    res
      .status(200)
      .json(deleteReview, { message: "Avis supprimée avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviewTopRatedBYSession = async (id) => {
  return await Session.findOneById(id);
};

export const getTopRatedTrainings = async (req, res) => {
  try {
    const topTrainings = await reviewService.getTopRatedTrainings();
    res.status(200).json(topTrainings);
  } catch (error) {
    console.error("Erreur complète :", error); // <--- très important pour debugger
    res.status(500).json({ error: error.message }); // renvoie le message réel
  }
};

export const getTopRatedSessions = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const sessions = await reviewService.getTopRatedSessions(limit);
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
