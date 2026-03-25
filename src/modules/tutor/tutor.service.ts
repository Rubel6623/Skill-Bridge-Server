import { prisma } from "../../lib/prisma";

const createTutorProfileIntoDB = async (userId: string, userRole:string, payload: any) => {
  const { bio, pricePerHour, subjects, experience} = payload;

  const result = await prisma.tutorProfile.create({
    data: {
      userId,
      bio,
      pricePerHour,
      experience,
      subjects: {
        create: subjects.map((subject: any) => ({
          categoryId: subject.categoryId,
          title: subject.title
        })),
      },
    },
    include: {
      subjects: {
        include: {
          category: true 
        }
      },
    },
  });

  return result;
};

const getAllTutors = async (filters: any) => {
  const { categoryName, categoryId, searchTerm, minPrice, maxPrice, page = 1, limit = 10 } = filters;
  
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = {};

  if (categoryId) {
    where.subjects = {
      some: { categoryId }
    };
  }

  
  if (categoryName) {
    where.subjects = {
      some: {
        category: {
          name: {
            contains: categoryName,
            mode: 'insensitive'
          }
        }
      }
    };
  }

  const result = await prisma.tutorProfile.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      user: { select: { id: true, name: true, email: true, avatar: true } },
      subjects: { include: { category: true } },
    },
  });

  const total = await prisma.tutorProfile.count({ where });

  return {
    meta: { page: pageNumber, limit: limitNumber, total },
    data: result
  };
};


const getTutorById = async (id: string) => {
  const result = await prisma.tutorProfile.findFirst({
    where: {
      OR: [
        { id: id },
        { userId: id }
      ]
    },
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
          title: sub.title
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

const getAllTutorSubjects = async (searchTerm?: string) => {
  const where: any = {};

  if (searchTerm) {
    where.OR = [
      {
        title: {
          contains: searchTerm,
          mode: 'insensitive', 
        },
      },
      {
        category: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  const result = await prisma.tutorSubject.findMany({
    where,
    include: {
      category: true,
      bookings: true,
      tutorProfile: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getMySubjectsFromDB = async (userId: string) => {
  const result = await prisma.tutorSubject.findMany({
    where: {
      tutorProfile: {
        userId: userId,
      },
    },
    include: {
      category: true,
    },
  });
  return result;
};

const getTutorSubjectById = async (id: string) => {
  console.log(`[Service] Backend lookup for Subject ID: "${id}"`);
  const result = await prisma.tutorSubject.findUnique({
    where: { id },
    include: {
      category: true,
      tutorProfile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          subjects: { include: { category: true } },
          availability: true,
        },
      },
    },
  });
  console.log(`[Service] Backend lookup result for "${id}":`, result ? "FOUND" : "NOT FOUND");
  return result;
};

export const TutorServices = {
  createTutorProfileIntoDB,
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  updateAvailability,
  getAllTutorSubjects,
  getMySubjectsFromDB,
  getTutorSubjectById
};
