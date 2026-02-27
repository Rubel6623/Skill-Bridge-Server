import express from 'express';
import { TutorController } from './tutor.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.put('/create-profile',auth(UserRole.tutor),TutorController.createTutorProfile);

router.get("/tutors", TutorController.getAllTutors);

router.get("/tutors/:id", TutorController.getTutorById);

router.put("/tutor/profile", auth(UserRole.tutor), TutorController.updateTutorProfile);

router.put("/availability/:id", TutorController.updateAvailability);

export const TutorRoutes = router;
