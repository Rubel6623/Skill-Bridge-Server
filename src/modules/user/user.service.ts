import { prisma } from "../../lib/prisma";


const getUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};


const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    // include: {
    //   tutorProfile: {
    //     include: {
    //       subjects: {
    //         include: { category: true },
    //       },
    //       availability: true,
    //       reviews: true,
    //     },
    //   },
    // },
  });
  return result;
};


const updateUser = async (
id: string, data: { name?: string; role?: string; email?: string; }, email: any, p0: string | string[]) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return result;
};


const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const UserServices = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};