import express from 'express';
import { AuthController } from './auth.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post('/register',AuthController.createUser)
router.post('/login',AuthController.loginUser)
router.get('/me',auth(UserRole.admin,UserRole.student,UserRole.tutor),AuthController.getMe)
// router.post('/api/auth/login',AuthController.loginUser)

export const AuthRoutes = router;