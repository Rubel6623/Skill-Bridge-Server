import express from 'express';
import { BlogController } from './blog.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/", auth(UserRole.admin, UserRole.tutor), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/admin", auth(UserRole.admin), BlogController.getAdminBlogs);
router.get("/my-blogs", auth(UserRole.admin, UserRole.tutor), BlogController.getMyBlogs);
// Category routes
router.post("/categories", auth(UserRole.admin), BlogController.createCategory);
router.get("/categories", BlogController.getAllCategories);
router.patch("/categories/:id", auth(UserRole.admin), BlogController.updateCategory);
router.delete("/categories/:id", auth(UserRole.admin), BlogController.deleteCategory);

router.get("/:id", BlogController.getBlogById);
router.patch("/:id", auth(UserRole.admin, UserRole.tutor), BlogController.updateBlog);
router.delete("/:id", auth(UserRole.admin, UserRole.tutor), BlogController.deleteBlog);
router.patch("/:id/approve", auth(UserRole.admin), BlogController.approveBlog);

export const BlogRoutes = router;
