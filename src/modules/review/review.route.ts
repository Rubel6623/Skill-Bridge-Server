import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post("/reviews", ReviewController.createReview);
router.get("/tutors/:tutorProfileId/reviews", ReviewController.getReviewsByTutor);

export const ReviewRoutes = router;
