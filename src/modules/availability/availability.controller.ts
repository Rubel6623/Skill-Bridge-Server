// src/modules/availability/availability.controller.ts
import { Request, Response } from 'express';
import { AvailabilityService } from './availability.service';
import { prisma } from '../../lib/prisma';

const setAvailability = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    

    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId },
    });

    console.log(tutorProfile,userId);

    if (!tutorProfile) {
      return res.status(404).json({ success: false, message: "Tutor profile not found" });
    }

    const result = await AvailabilityService.updateAvailabilityIntoDB(
      tutorProfile.id,
      req.body.slots
    );
    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTutorAvailability = async (req: Request, res: Response) => {
  try {
    const { tutorProfileId } = req.params;

    const result = await AvailabilityService.getTutorAvailabilityFromDB(tutorProfileId as string);
    res.status(200).json({
      success: true,
      message: "Availability fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const AvailabilityController = {
  setAvailability,
  getTutorAvailability,
};