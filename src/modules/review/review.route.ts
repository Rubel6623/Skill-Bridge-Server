import express from 'express';
import { ReviewController } from './review.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/reviews", ReviewController.createReview);
router.get("/tutors/:tutorProfileId/reviews", auth(UserRole.tutor), ReviewController.getReviewsByTutor);

export const ReviewRoutes = router;
