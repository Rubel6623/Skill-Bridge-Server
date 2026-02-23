import { Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { BookingStatus } from "../../../generated/prisma/enums";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { studentId, tutorProfileId, startTime, endTime, totalPrice } = req.body;
    const result = await BookingServices.createBooking({ studentId, tutorProfileId, startTime, endTime, totalPrice });

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
    const { userId, role } = req.query as { userId: string, role: string };

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
    const { id } = req.params;
    const { status } = req.body as { status: BookingStatus };

    const result = await BookingServices.updateBookingStatus(id as string, status);

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
