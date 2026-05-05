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
      let token = req.headers.authorization;

      if (!token) {
        throw new Error("Token not found!!");
      }

      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET?.trim() as string) as JwtPayload;
      console.log("Decoded Token:", JSON.stringify(decoded));

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      console.log("Found User Data:", JSON.stringify(userData));

      if (!userData) {
        console.log("Auth Error: User not found in DB for email:", decoded.email);
        throw new Error("Unauthorized!");
      }

      if (userData.status !== "ACTIVE") {
        console.log("Auth Error: User status is not ACTIVE. Current status:", userData.status);
        throw new Error("Unauthorized!!");
      }

      if (roles.length && !roles.includes(decoded.role as UserRole)) {
        console.log("Auth Error: Role mismatch. Required:", roles, "User role:", decoded.role);
        throw new Error("Unauthorized!!!");
      }

      req.user = decoded;

      next();
    } catch (error: any) {
      console.error("Auth Middleware Error:", error.message);
      next(error);
    }
  };
};

export default auth;