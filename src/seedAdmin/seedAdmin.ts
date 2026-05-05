import { prisma } from "../lib/prisma";
import { Role, Status } from "../../generated/prisma/enums";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 8);

  const adminData = {
    name: process.env.NAME!,
    email: process.env.ADMIN_EMAIL!,
    role: Role.ADMIN,
    password: hashedPassword,
    status: Status.ACTIVE,
  };

  try {
    await prisma.user.upsert({
      where: {
        email: adminData.email,
      },
      update: {
        status: Status.ACTIVE,
        role: Role.ADMIN,
      },
      create: adminData,
    });
    console.log("Admin seeded/updated successfully!!");
  } catch (error) {
    console.log(error);
  } finally{
    await prisma.$disconnect()
  }
};
seedAdmin();