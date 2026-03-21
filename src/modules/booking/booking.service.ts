import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";

const createBooking = async (data: {
  studentId: string;
  tutorProfileId: string;
  tutorSubjectId: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}) => {
  
  const result = await prisma.booking.create({
    
    data: {
      studentId: data.studentId,
      tutorProfileId: data.tutorProfileId,
      tutorSubjectId: data.tutorSubjectId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      totalPrice: data.totalPrice,
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

export const BookingServices = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus
};
