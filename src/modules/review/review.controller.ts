import { Request, Response } from "express";
import { ReviewServices } from "./review.service";
import { prisma } from "../../lib/prisma";

const createReview = async (req: Request, res: Response) => {
  try {
    const { studentId, tutorProfileId, bookingId, rating, comment } = req.body;
    
    
    if (rating < 1 || rating > 5) {
      res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
      return;
    }

    const result = await ReviewServices.createReview({ studentId, tutorProfileId, bookingId, rating, comment });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: result,
    });
  } catch (err: any) {    
    if (err.code === "P2002") {
      res.status(400).json({ success: false, message: "A review already exists for this booking." });
      return;
    }

    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getReviewsByTutor = async (req: Request, res: Response) => {
  try {
    const { tutorProfileId } = req.params;
    const result = await ReviewServices.getReviewsByTutor(tutorProfileId as string);

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};
const getMyReviews = async (req: Request, res: Response) => {
  try {
    // This requires auth middleware to provide req.user
    const userId = (req as any).user.id;

    // 1. Find the tutor profile associated with this user
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId },
    });

    if (!tutorProfile) {
      return res.status(404).json({ 
        success: false, 
        message: "Tutor profile not found for this account" 
      });
    }

    // 2. Fetch reviews using the tutor profile ID
    const result = await ReviewServices.getReviewsByTutor(tutorProfile.id);

    res.status(200).json({
      success: true,
      message: "Your reviews retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const ReviewController = {
  createReview,
  getReviewsByTutor,
  getMyReviews,
};
