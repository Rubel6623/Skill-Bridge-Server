import express from 'express';
import { UserController } from './user.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get("/users", auth(UserRole.admin), UserController.getUser);

router.get("/users/:id", auth(UserRole.admin),  UserController.getSingleUser);

router.put("/users/:id", UserController.updateUser);

router.delete("/users/:id", UserController.deleteUser);

export const UserRoutes = router;
