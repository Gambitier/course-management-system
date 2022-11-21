import { CourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo';
import { ICourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo.interface';
import { CourseRepository } from '@modules/course/repositories/course.repo';
import { ICourseRepository } from '@modules/course/repositories/course.repo.interface';
import { Provider } from '@nestjs/common';

export const CourseRepositoryProvider: Provider = {
  provide: ICourseRepository,
  useClass: CourseRepository,
};

export const CourseEnrollmentRepositoryProvider: Provider = {
  provide: ICourseEnrollmentRepository,
  useClass: CourseEnrollmentRepository,
};
