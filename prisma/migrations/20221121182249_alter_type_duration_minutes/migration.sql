/*
  Warnings:

  - You are about to alter the column `durationMinutes` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "durationMinutes" SET DATA TYPE INTEGER;
