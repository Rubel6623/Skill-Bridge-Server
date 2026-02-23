import { prisma } from "../../lib/prisma";

const createCategory = async (data: { name: string, slug: string }) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { tutorSubjects: true }
      }
    }
  });
  return result;
};

const updateCategory = async (id: string, data: { name?: string, slug?: string }) => {
  const result = await prisma.category.update({
    where: { id },
    data,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
