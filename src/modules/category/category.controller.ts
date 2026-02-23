import { Request, Response } from "express";
import { CategoryServices } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;
    const result = await CategoryServices.createCategory({ name, slug });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      res.status(400).json({ success: false, message: "Category name or slug already exists" });
      return;
    }
    res.status(500).json({ success: false, message: err.message, details: err });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryServices.getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, details: err });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const result = await CategoryServices.updateCategory(id as string, { name, slug });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(500).json({ success: false, message: err.message, details: err });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(500).json({ success: false, message: err.message, details: err });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
