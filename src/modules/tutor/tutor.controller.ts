import { Request, Response } from "express";
import { TutorServices } from "./tutor.service";


const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    const result = await TutorServices.createTutorProfileIntoDB(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Tutor profile created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create profile',
    });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const filters = req.query; 
    const result = await TutorServices.getAllTutors(filters);

    res.status(200).json({
      success: true,
      message: "Tutors retrieved successfully",
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

const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await TutorServices.getTutorById(id as string);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Tutor fetched successfully",
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

const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await TutorServices.updateTutorProfile(id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const availabilityData = req.body.availability;
    const result = await TutorServices.updateAvailability(id as string, availabilityData || []);

    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
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

export const TutorController = {
  createTutorProfile,
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
};
