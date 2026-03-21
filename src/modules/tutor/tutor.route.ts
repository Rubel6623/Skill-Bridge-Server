import express from 'express';
import { TutorController } from './tutor.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/tutors/create-profile',auth(UserRole.tutor),TutorController.createTutorProfile);

router.get("/tutors", TutorController.getAllTutors);

router.get("/tutors/:id", TutorController.getTutorById);

router.put("/tutors/profile", auth(UserRole.tutor), TutorController.updateTutorProfile);

router.get("/tutor-subjects", TutorController.getAllTutorSubjects);

router.get(
  "/my-subjects", 
  auth(UserRole.tutor), 
  TutorController.getMySubjects
);

router.put("/tutors/availability/:id", TutorController.updateAvailability);

export const TutorRoutes = router;
