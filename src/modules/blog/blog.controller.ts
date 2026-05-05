import { Request, Response, NextFunction } from "express";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId, role } = req.user as any;
    const result = await BlogService.createBlog(userId, role, req.body);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.getAllBlogs(req.query);
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.getAdminBlogs();
    res.status(200).json({
      success: true,
      message: "Admin blogs fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user as any;
    const result = await BlogService.getMyBlogs(userId);
    res.status(200).json({
      success: true,
      message: "My blogs fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.getBlogById(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId, role } = req.user as any;
    const result = await BlogService.updateBlog(req.params.id as string, userId, role, req.body);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId, role } = req.user as any;
    await BlogService.deleteBlog(req.params.id as string, userId, role);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const approveBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.approveBlog(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Blog approved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Blog category created successfully",
      data: result,
    });
  } catch (error: any) {
    error.statusCode = 400;
    next(error);
  }
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.getAllCategories();
    console.log("Server categories result:", result);
    res.status(200).json({
      success: true,
      message: "Blog categories fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.updateCategory(req.params.id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Blog category updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await BlogService.deleteCategory(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Blog category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getAdminBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  approveBlog,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
