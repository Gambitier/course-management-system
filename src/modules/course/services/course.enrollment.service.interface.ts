export const ICourseEnrollmentService = Symbol('ICourseEnrollmentService');

export interface ICourseEnrollmentService {
  isCourseEnrollmentBelongsToUser(
    userId: string,
    courseEnrollmentId: string,
  ): boolean | PromiseLike<boolean>;
  enrollForCourse(courseId: string, userId: string): unknown;
  getCourseEnrollments(courseId: string): unknown;
}
