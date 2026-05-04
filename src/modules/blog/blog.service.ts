import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

const createBlog = async (userId: string, role: string, payload: any) => {
  const status = role === UserRole.admin ? "APPROVED" : "PENDING";
  const result = await prisma.blog.create({
    data: {
      ...payload,
      authorId: userId,
      status,
    },
  });
  return result;
};

const getAllBlogs = async (query: any) => {
  const { searchTerm, categoryId, limit = 10, page = 1 } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {
    status: "APPROVED",
  };

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { content: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  const result = await prisma.blog.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: Number(limit),
  });

  const total = await prisma.blog.count({ where });

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
    data: result,
  };
};

const getAdminBlogs = async () => {
  const result = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getMyBlogs = async (userId: string) => {
  const result = await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getBlogById = async (id: string) => {
  const result = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      category: true,
    },
  });
  return result;
};

const updateBlog = async (id: string, userId: string, role: string, payload: any) => {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) throw new Error("Blog not found");

  if (role !== UserRole.admin && blog.authorId !== userId) {
    throw new Error("You are not authorized to update this blog");
  }

  const result = await prisma.blog.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string, userId: string, role: string) => {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) throw new Error("Blog not found");

  if (role !== UserRole.admin && blog.authorId !== userId) {
    throw new Error("You are not authorized to delete this blog");
  }

  const result = await prisma.blog.delete({
    where: { id },
  });
  return result;
};

const approveBlog = async (id: string) => {
  const result = await prisma.blog.update({
    where: { id },
    data: { status: "APPROVED" },
  });
  return result;
};

// Category methods
const createCategory = async (payload: { name: string }) => {
  const result = await prisma.blogCategory.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: { blogs: true }
      }
    }
  });
  return result;
};

const updateCategory = async (id: string, payload: { name: string }) => {
  const result = await prisma.blogCategory.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.blogCategory.delete({
    where: { id },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getAdminBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  approveBlog,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
