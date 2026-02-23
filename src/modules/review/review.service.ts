import { prisma } from "../../lib/prisma";

const createReview = async (data: { studentId: string, tutorProfileId: string, bookingId: string, rating: number, comment: string }) => {
  const result = await prisma.review.create({
    data: {
      studentId: data.studentId,
      tutorProfileId: data.tutorProfileId,
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment,
    },
    include: {
      student: { 
        select: { 
          id: true, name: true, avatar: true 
        } 
      },
    }
  });

  
  const tutorReviews = await prisma.review.aggregate({
    _avg: { rating: true },
    where: { tutorProfileId: data.tutorProfileId }
  });

  if (tutorReviews._avg.rating) {
    await prisma.tutorProfile.update({
      where: { id: data.tutorProfileId },
      data: { rating: tutorReviews._avg.rating }
    });
  }

  return result;
};

const getReviewsByTutor = async (tutorProfileId: string) => {
  const result = await prisma.review.findMany({
    where: { tutorProfileId },
    include: {
      student: { 
        select: { 
          id: true, name: true, avatar: true 
        } 
      },
    }
  });
  return result;
};

export const ReviewServices = {
  createReview,
  getReviewsByTutor,
};
