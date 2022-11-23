import { ICourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo.interface';
import { ICourseEnrollmentService } from '@modules/course/services/course.enrollment.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CourseEnrollmentService implements ICourseEnrollmentService {
  /**
   *
   */
  constructor(
    @Inject(ICourseEnrollmentRepository)
    private _courseEnrollmentRepository: ICourseEnrollmentRepository,
  ) {
    //
  }

  enrollForCourse(courseId: string, userId: string): unknown {
    throw new Error('Method not implemented.');
  }

  getCourseEnrollments(courseId: string): unknown {
    throw new Error('Method not implemented.');
  }
}
