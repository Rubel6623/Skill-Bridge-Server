import express from 'express';
import { CategoryController } from './category.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/admin/categories", auth(UserRole.admin), CategoryController.createCategory);

router.get("/categories", CategoryController.getAllCategories);

router.put("/admin/categories/:id",auth(UserRole.admin), CategoryController.updateCategory);

router.delete("/admin/categories/:id", auth(UserRole.admin),  CategoryController.deleteCategory);

export const CategoryRoutes = router;
