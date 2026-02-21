import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: any) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);

    const result = await prisma.user.create({
      data: { ...payload, password: hashPassword },
    });
    const { password, ...newResult } = result;
    return newResult;
};

export const AuthService = {
  createUserIntoDB,
};