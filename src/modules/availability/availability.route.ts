import express from 'express';
import { AvailabilityController } from './availability.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.put('/tutor/availability',auth(UserRole.tutor),AvailabilityController.setAvailability);

router.get('/tutor/availability/me', auth(UserRole.tutor), AvailabilityController.getMyAvailability);

router.get('/:tutorProfileId',AvailabilityController.getTutorAvailability);

export const AvailabilityRoutes = router;