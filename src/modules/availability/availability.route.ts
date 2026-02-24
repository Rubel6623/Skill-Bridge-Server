import express from 'express';
import { AvailabilityController } from './availability.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.put('/set-slots',auth(UserRole.tutor),AvailabilityController.setAvailability);

router.get('/:tutorProfileId',AvailabilityController.getTutorAvailability);

export const AvailabilityRoutes = router;