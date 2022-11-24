import { CourseEnrollmeentDomainModel } from '@modules/course/domain.types/course-enrollment/course.enrollment.domain.model';
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

  async getUserCourseEnrollmentProgress(
    userId: string,
    courseId: string,
  ): Promise<any> {
    return this._courseEnrollmentRepository.getUserCourseEnrollmentProgress(
      userId,
      courseId,
    );
  }

  isCourseEnrollmentBelongsToUser(
    userId: string,
    courseEnrollmentId: string,
  ): boolean | PromiseLike<boolean> {
    return this._courseEnrollmentRepository.isCourseEnrollmentBelongsToUser(
      userId,
      courseEnrollmentId,
    );
  }

  async enrollForCourse(courseId: string, userId: string): Promise<boolean> {
    await this._courseEnrollmentRepository.enrollForCourse(courseId, userId);
    return true;
  }

  async getCourseEnrollments(
    courseId: string,
  ): Promise<CourseEnrollmeentDomainModel[]> {
    const data = await this._courseEnrollmentRepository.getCourseEnrollments(
      courseId,
    );
    return data;
  }
}
