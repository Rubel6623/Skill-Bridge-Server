import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.createUserIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (e) {
      res.status(400).json({
      error: "User creation failed",
      details: e,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    })
      res.status(200).json({
      success: true,
      message: "User Login successfully",
      data: result
    });
  } catch (e: any) {
    res.status(401).json({
      success: false,
      message: e.message || "User Login failed",
      error: e,
    });
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
