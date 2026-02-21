import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/register',AuthController.createUser)
// router.post('/api/auth/login',AuthController.loginUser)

export const AuthRoutes = router;