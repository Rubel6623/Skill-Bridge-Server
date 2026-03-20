import express from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/booking", BookingController.createBooking);

router.get("/booking", auth(UserRole.student, UserRole.tutor, UserRole.admin), BookingController.getUserBookings);

router.get("/booking/:id", auth(UserRole.student, UserRole.tutor, UserRole.admin), BookingController.getBookingById);

router.put("/booking/:id/status", auth(UserRole.admin, UserRole.tutor),BookingController.updateBookingStatus); 

export const BookingRoutes = router;
