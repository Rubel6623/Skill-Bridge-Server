-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "tutorSubjectId" TEXT;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tutorSubjectId_fkey" FOREIGN KEY ("tutorSubjectId") REFERENCES "tutor_subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
