import express from 'express';
import { ReviewController } from './review.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

// --- Open Routes (No Auth required as per your preference) ---

// Create a review
router.post("/review", ReviewController.createReview);

// Get reviews for a specific tutor (Publicly visible)
router.get("/review/tutor/:tutorProfileId", ReviewController.getReviewsByTutor);

// --- Protected Routes (Requires Auth) ---

// Get reviews for the logged-in tutor
router.get(
  "/review/my-reviews", 
  auth(UserRole.tutor), 
  ReviewController.getMyReviews
);

export const ReviewRoutes = router;