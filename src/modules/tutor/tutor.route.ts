import express from 'express';
import { TutorController } from './tutor.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/create-profile',auth(UserRole.tutor),TutorController.createTutorProfile);

router.get("/", TutorController.getAllTutors);

router.get("/:id", TutorController.getTutorById);

router.put("/profile/:id",auth(UserRole.tutor), TutorController.updateTutorProfile);

router.put("/availability/:id", TutorController.updateAvailability);

export const TutorRoutes = router;
