-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "approvedAt" TIMESTAMPTZ(6),
ADD COLUMN     "approvedByUserId" UUID;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_approvedByUserId_fkey" FOREIGN KEY ("approvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
