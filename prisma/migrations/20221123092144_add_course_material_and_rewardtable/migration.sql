-- CreateTable
CREATE TABLE "CourseMaterial" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "courseId" UUID NOT NULL,
    "pdfUrl" VARCHAR(2048) NOT NULL,
    "videoUrl" VARCHAR(2048) NOT NULL,
    "quizUrl" VARCHAR(2048) NOT NULL,

    CONSTRAINT "CourseMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseMaterialProgress" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "courseMaterialId" UUID NOT NULL,
    "courseEnrollmentId" UUID NOT NULL,
    "progressPercentage" INTEGER NOT NULL,

    CONSTRAINT "CourseMaterialProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProgressReward" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deleted" TIMESTAMPTZ(6),
    "courseEnrollmentId" UUID NOT NULL,
    "progressPercentage" INTEGER NOT NULL,
    "rewardPoints" INTEGER NOT NULL,

    CONSTRAINT "CourseProgressReward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgressReward_courseEnrollmentId_key" ON "CourseProgressReward"("courseEnrollmentId");

-- AddForeignKey
ALTER TABLE "CourseMaterial" ADD CONSTRAINT "CourseMaterial_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMaterialProgress" ADD CONSTRAINT "CourseMaterialProgress_courseMaterialId_fkey" FOREIGN KEY ("courseMaterialId") REFERENCES "CourseMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMaterialProgress" ADD CONSTRAINT "CourseMaterialProgress_courseEnrollmentId_fkey" FOREIGN KEY ("courseEnrollmentId") REFERENCES "CourseEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgressReward" ADD CONSTRAINT "CourseProgressReward_courseEnrollmentId_fkey" FOREIGN KEY ("courseEnrollmentId") REFERENCES "CourseEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
