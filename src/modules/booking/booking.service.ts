import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

const createBooking = async (payload: any) => {
  
  const {studentId,tutorProfileId,tutorSubjectId,startTime,durationInHours} = payload;

  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorProfileId }
  });

  if (!tutor) {
    throw new Error("Tutor profile not found in database.");
  }

  const totalPrice = tutor.pricePerHour * (durationInHours || 1);
  const endTime = new Date(new Date(startTime).getTime() + (durationInHours || 1) * 60 * 60 * 1000);

  const result = await prisma.booking.create({
    
    data: {
      studentId: studentId,
      tutorProfileId: tutorProfileId,
      tutorSubjectId: tutorSubjectId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalPrice: totalPrice,
      status: BookingStatus.PENDING,
    },
    include: {
      student: { select: 
        { id: true, name: true, email: true } 
      },
      tutorSubject: { include: { category: true } },
      tutorProfile: 
      { include: 
        { user: 
          { select: 
            { id: true, name: true } 
          } 
        } 
      },
    },
  });
  return result;
};

const getUserBookings = async (userId: string, role: string) => {
  const where: any = {};

  if (role === "STUDENT") {
    where.studentId = userId;
  } else if (role === "TUTOR") {
    where.tutorProfile = {
      userId: userId,
    };
  }

  const result = await prisma.booking.findMany({
    where,
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutorSubject: {
        include: { category: true }
      },
      tutorProfile: {
        include: { 
          user: 
          { select: 
            { id: true, name: true, avatar: true } 
          } 
        } 
      },
      review: true,
    },
    orderBy: {
      startTime: 'desc'
    }
  });
  return result;
};

const getAllBookings = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutorSubject: {
        include: { category: true }
      },
      tutorProfile: {
        include: { 
          user: { select: { id: true, name: true, avatar: true } } 
        } 
      },
      review: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return result;
};

const getBookingById = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: { id },
    include: {
      student: { 
        select: 
        { id: true, name: true, email: true } 
      },
      tutorProfile: 
      { include: { 
          user: 
          { 
            select: 
            { id: true, name: true } 
          } 
        } 
      },
      review: true,
    },
  });
  return result;
};

const updateBookingStatus = async (bookingId: string, status: BookingStatus,userId: string, role: string) => {

  if (role === "TUTOR") {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { tutorProfile: true }
    });

    if (!booking || booking.tutorProfile.userId !== userId) {
      throw new Error("You are not authorized to update this booking.");
    }
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
    include: {
      student: 
      { 
        select: 
        { id: true, name: true, email: true } 
      },
      tutorProfile: { 
        include: { 
        user: { 
          select: { id: true, name: true } 
        } 
      } 
    },
    },
  });
  return result;
};

const deleteBooking = async (id: string, role: string) => {
  if (role !== "ADMIN") {
    throw new Error("Only admins can delete bookings.");
  }

  // Check if booking exists
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  const result = await prisma.booking.delete({
    where: { id },
  });

  return result;
};

export const BookingServices = {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
