import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 8);

  const adminData = {
    name: process.env.NAME!,
    email: process.env.ADMIN_EMAIL!,
    role: UserRole.admin,
    password: hashedPassword,
  };

  try {
    const isExists = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (isExists) {
      console.log("Admin already exists!!");
      return;
    }
    await prisma.user.create({
      data: adminData,
    });
    console.log("Admin created successfully!!");
  } catch (error) {
    console.log(error);
  } finally{
    await prisma.$disconnect()
  }
};
seedAdmin();