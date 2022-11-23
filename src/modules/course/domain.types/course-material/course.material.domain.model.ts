export type CourseMaterialDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: Date | null;
  courseId: string;
  title: string;
  pdfUrl: string;
  videoUrl: string;
  quizUrl: string;
};
