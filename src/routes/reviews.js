import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";
import auth from "../utils/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const review = await updateReview(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found!` });
    } else {
      res.status(200).json({ message: `review updated!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReview(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found!` });
    } else {
      res.status(200).json({ message: `review deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
