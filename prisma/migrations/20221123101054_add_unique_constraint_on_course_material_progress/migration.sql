/*
  Warnings:

  - A unique constraint covering the columns `[courseMaterialId,courseEnrollmentId]` on the table `CourseMaterialProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseMaterialProgress_courseMaterialId_courseEnrollmentId_key" ON "CourseMaterialProgress"("courseMaterialId", "courseEnrollmentId");
