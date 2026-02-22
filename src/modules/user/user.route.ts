import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get("/api/admin/users",  UserController.getUser);

router.get("/:id",  UserController.getSingleUser);

router.put("/api/admin/users/:id", UserController.updateUser);

router.delete("/api/admin/users/:id", UserController.deleteUser);

export const UserRoutes = router;
