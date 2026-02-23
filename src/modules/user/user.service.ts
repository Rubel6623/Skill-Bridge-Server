import { prisma } from "../../lib/prisma";


const getUser = async () => {
  const result = await prisma.user.findMany({
    select: {
    id: true,
    name: true,
    email: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    tutorProfile: true,
  },
});
  return result;
};


const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      tutorProfile: {
        include: {
          subjects: {
            include: { category: true }
          },
          availability: true,
          reviews: true,
        },
      },
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  data: { name?: string; email?: string; role?: any; avatar?: string; status?: any }
) => {
  const result = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,      
      status: data.status,      
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
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