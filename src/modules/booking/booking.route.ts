import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post("/", BookingController.createBooking);
router.get("/", BookingController.getUserBookings);
router.get("/:id", BookingController.getBookingById);
router.patch("/:id/status", BookingController.updateBookingStatus); // for tutor/admin

export const BookingRoutes = router;
