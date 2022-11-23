///////////////////////////////

import { CourseEnrollmeentDomainModel } from '@modules/course/domain.types/course-enrollment/course.enrollment.domain.model';

export const ICourseEnrollmentRepository = Symbol(
  'ICourseEnrollmentRepository',
);

export interface ICourseEnrollmentRepository {
  getCourseEnrollments(
    courseId: string,
  ): Promise<CourseEnrollmeentDomainModel[]>;

  enrollForCourse(courseId: string, userId: string): Promise<boolean>;
}
