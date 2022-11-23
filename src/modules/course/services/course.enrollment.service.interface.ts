export const ICourseEnrollmentService = Symbol('ICourseEnrollmentService');

export interface ICourseEnrollmentService {
  enrollForCourse(courseId: string, userId: string): unknown;
  getCourseEnrollments(courseId: string): unknown;
}
