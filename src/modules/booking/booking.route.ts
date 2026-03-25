import express from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/booking", auth(UserRole.student), BookingController.createBooking);

router.get("/booking", auth(UserRole.student, UserRole.tutor, UserRole.admin), BookingController.getUserBookings);

router.get("/booking/all", auth(UserRole.admin), BookingController.getAllBookings);

router.get("/booking/:id", auth(UserRole.student, UserRole.tutor, UserRole.admin), BookingController.getBookingById);

router.put("/booking/status/:bookingId", auth(UserRole.admin, UserRole.tutor),BookingController.updateBookingStatus); 

router.delete("/booking/:id", auth(UserRole.admin), BookingController.deleteBooking);

export const BookingRoutes = router;
