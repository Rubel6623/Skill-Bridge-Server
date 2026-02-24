import { prisma } from "../../lib/prisma";

const createTutorProfileIntoDB = async (userId: string, payload: any) => {
  const { bio, pricePerHour, subjects } = payload;

  const result = await prisma.tutorProfile.create({
    data: {
      userId,
      bio,
      pricePerHour,
      subjects: {
        create: subjects.map((subject: any) => ({
          categoryId: subject.categoryId,
          thumbnail: subject.thumbnail,
        })),
      },
    },
    include: {
      subjects: true,
    },
  });

  return result;
};

const getAllTutors = async (filters: any) => {  
  const where = {};
  
  if (filters.categoryId) {
    (where as any).subjects = {
      some: {
        categoryId: filters.categoryId
      }
    };
  }  
  const result = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      subjects: {
        include: { category: true }
      },
    },
  });
  return result;
};

const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      subjects: {
        include: { category: true }
      },
      availability: true,
      reviews: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const updateTutorProfile = async (userId: string, payload: any) => {
  const { subjects, ...profileData } = payload;

  const result = await prisma.tutorProfile.update({
    where: { userId: userId }, 
    data: {
      ...profileData,
      subjects: {
        deleteMany: {},
        create: subjects?.map((sub: any) => ({
          categoryId: sub.categoryId,
          thumbnail: sub.thumbnail,
        })),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      subjects: {
        include: { category: true },
      },
    },
  });
  return result;
};

const updateAvailability = async (tutorProfileId: string, availabilityData: any[]) => {
  
  await prisma.availability.deleteMany({
    where: { tutorProfileId },
  });

  if (availabilityData && availabilityData.length > 0) {
    await prisma.availability.createMany({
      data: availabilityData.map((slot) => ({
        ...slot,
        tutorProfileId,
      })),
    });
  }

  
  return prisma.availability.findMany({
    where: { tutorProfileId },
  });
};

export const TutorServices = {
  createTutorProfileIntoDB,
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
};
