import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success } from "zod";

const createUserIntoDB = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);

    const result = await prisma.user.create({
      data: { ...payload, password: hashPassword },
    });
    const { password, ...newResult } = result;
    return newResult;
};

const loginUserIntoDB = async (payload: any) => {

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const userData = {
    id: user.id,
    email: user.email,
    password: user.password,
    role: user.role,
    status: user.status
  }

  const token  = jwt.sign(userData, process.env.JWT_SECRET as string, {expiresIn: '1d'});

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
};