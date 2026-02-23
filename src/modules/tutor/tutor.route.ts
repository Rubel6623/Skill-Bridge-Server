import express from 'express';
import { TutorController } from './tutor.controller';

const router = express.Router();

router.get("/", TutorController.getAllTutors);

router.get("/:id", TutorController.getTutorById);

router.put("/profile/:id", TutorController.updateTutorProfile);

router.put("/availability/:id", TutorController.updateAvailability);

export const TutorRoutes = router;
