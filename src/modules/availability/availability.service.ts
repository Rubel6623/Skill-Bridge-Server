import { prisma } from "../../lib/prisma";
import { sortAvailability } from "../../utils/sortDays";


const updateAvailabilityIntoDB = async (tutorProfileId: string, payload: any[]) => {
  return await prisma.$transaction(async (tx) => {
    await tx.availability.deleteMany({
      where: { tutorProfileId },
    });

    if (payload && payload.length > 0) {
      await tx.availability.createMany({
        data: payload.map((slot) => ({
          tutorProfileId,
          dayOfWeek: slot.dayOfWeek.toUpperCase(),
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      });
    }

    const result = await tx.availability.findMany({
      where: { tutorProfileId },
    });

    return sortAvailability(result);
  });
};

const getTutorAvailabilityFromDB = async (tutorProfileId: string) => {
  const result = await prisma.availability.findMany({
    where: { tutorProfileId },
  });
  
  return sortAvailability(result);
};

export const AvailabilityService = {
  updateAvailabilityIntoDB,
  getTutorAvailabilityFromDB,
};