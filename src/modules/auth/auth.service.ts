import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";

interface ILoginPayload {
  email: string;
  password: string;
}

interface IRegisterPayload extends ILoginPayload {
  name: string;
  role: Role;
  avatar?: string;
}

interface ISocialLoginPayload {
  email: string;
  name: string;
  avatar?: string;
}

const createUserIntoDB = async (payload: IRegisterPayload) => {
    const hashPassword = await bcrypt.hash(payload.password, 8);

    const result = await prisma.user.create({
      data: { 
        ...payload, 
        password: hashPassword,
        role: payload.role.toUpperCase() as Role
      },
    });
    const { password, ...newResult } = result;
    return newResult;
};

const loginUserIntoDB = async (payload: ILoginPayload) => {

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
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  }

  const token  = jwt.sign(userData, (process.env.JWT_SECRET as string).trim(), {expiresIn: '1d'});

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
};

const socialLoginIntoDB = async (payload: ISocialLoginPayload) => {
  let user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    // Create user if not exists
    // Social login users get a default role of STUDENT if not specified
    // and a random/empty password since they login via social
    user = await prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        avatar: payload.avatar,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 8),
        role: Role.STUDENT,
      },
    });
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  const token = jwt.sign(userData, (process.env.JWT_SECRET as string).trim(), {
    expiresIn: "1d",
  });

  return {
    token,
    user: userData,
  };
};


const getMeFromDB = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      status: true,
      createdAt: true,
      tutorProfile: {
        include: {
          subjects: {
            include: { category: true }
          },
          availability: true
        }
      }
    }
  });
  return result;
};


const updateMeInDB = async (userId: string, payload: Partial<IRegisterPayload>) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      status: true,
      createdAt: true
    }
  });
  return result;
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
  socialLoginIntoDB,
  getMeFromDB,
  updateMeInDB
};