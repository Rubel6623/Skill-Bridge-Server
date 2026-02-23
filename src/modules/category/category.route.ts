import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post("/admin/categories", CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategories);
router.patch("/admin/categories/:id", CategoryController.updateCategory);
router.delete("/admin/categories/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
