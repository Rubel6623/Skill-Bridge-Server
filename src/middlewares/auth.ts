import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export enum UserRole {
  admin = "ADMIN",
  student = "STUDENT",
  tutor = "TUTOR",
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Token not found!!");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!userData) {
        throw new Error("Unauthorized!");
      }

      if (userData.status !== "ACTIVE") {
        throw new Error("Unauthorized!!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized!!!");
      }

      req.user = decoded;

      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default auth;