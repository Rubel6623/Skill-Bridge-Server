import { Request, Response } from "express";
import { UserServices } from "./user.service";


const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};


const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUser(id as string);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};


const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email,role } = req.body; 

    if(role==='STUDENT' && role==='TUTOR'){
      res.status(403).json({
        success: false,
        message: "Only admins can update user roles",
      });
      return;
    }
      const result = await UserServices.updateUser(id as string, name, email,role );

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
      });
    
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteUser(id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const UserController = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};