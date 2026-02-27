import express from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/", BookingController.createBooking);

router.get("/", BookingController.getUserBookings);

router.get("/:id", BookingController.getBookingById);

router.put("/:id/status", auth(UserRole.admin, UserRole.tutor),BookingController.updateBookingStatus); 

export const BookingRoutes = router;
