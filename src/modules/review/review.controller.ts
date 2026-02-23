import { Request, Response } from "express";
import { ReviewServices } from "./review.service";

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

export const ReviewController = {
  createReview,
  getReviewsByTutor,
};
