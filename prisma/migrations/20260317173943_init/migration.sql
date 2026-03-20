/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `tutor_subjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutor_subjects" DROP COLUMN "thumbnail",
ADD COLUMN     "title" TEXT;
