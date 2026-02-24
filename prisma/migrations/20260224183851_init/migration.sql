-- DropForeignKey
ALTER TABLE "tutor_subjects" DROP CONSTRAINT "tutor_subjects_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "tutor_subjects" DROP CONSTRAINT "tutor_subjects_tutorProfileId_fkey";

-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "dayOfWeek" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "tutor_subjects" ADD CONSTRAINT "tutor_subjects_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutorProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_subjects" ADD CONSTRAINT "tutor_subjects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
