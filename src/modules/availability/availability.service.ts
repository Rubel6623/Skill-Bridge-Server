import { prisma } from "../../lib/prisma";


const updateAvailabilityIntoDB = async (tutorProfileId: string, payload: any[]) => {
  return await prisma.$transaction(async (tx) => {
    await tx.availability.deleteMany({
      where: { tutorProfileId },
    });

    
    const result = await tx.availability.createMany({
      data: payload.map((slot) => ({
        tutorProfileId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    });

    return result;
  });
};

const getTutorAvailabilityFromDB = async (tutorProfileId: string) => {
  return await prisma.availability.findMany({
    where: { tutorProfileId },
    orderBy: [
      { dayOfWeek: 'asc' },
      { startTime: 'asc' },
    ],
  });
};

export const AvailabilityService = {
  updateAvailabilityIntoDB,
  getTutorAvailabilityFromDB,
};