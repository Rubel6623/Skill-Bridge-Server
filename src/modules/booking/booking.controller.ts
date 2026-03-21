import { Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { BookingStatus } from "../../../generated/prisma/enums";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { studentId, tutorProfileId,tutorSubjectId, startTime, endTime, totalPrice } = req.body;

    if (new Date(startTime) >= new Date(endTime)) {
      res.status(400).json({ 
        success: false, 
        message: "End time must be after start time" 
      });
      return;
    }

    const result = await BookingServices.createBooking({ studentId, tutorProfileId,tutorSubjectId, startTime, endTime, totalPrice });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
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

const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; 
    const role = (req as any).user.role;

    if (!userId || !role) {
      res.status(400).json({ success: false, message: "Missing userId or role" });
      return;
    }

    const result = await BookingServices.getUserBookings(userId, role);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
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

const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookingServices.getBookingById(id as string);

    if (!result) {
      res.status(404).json({ success: false, message: "Booking not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
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

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body as { status: BookingStatus };
    const userId = (req as any).user.id;
    const role = (req as any).user.role;

    const result = await BookingServices.updateBookingStatus(bookingId as string, status,userId,role);

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
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

export const BookingController = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
};
