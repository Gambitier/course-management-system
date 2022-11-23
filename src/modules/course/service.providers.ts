import { CourseEnrollmentService } from '@modules/course/services/course.enrollment.service';
import { ICourseEnrollmentService } from '@modules/course/services/course.enrollment.service.interface';
import { CourseMaterialService } from '@modules/course/services/course.material.service';
import { ICourseMaterialService } from '@modules/course/services/course.material.service.interface';
import { CourseService } from '@modules/course/services/course.service';
import { ICourseService } from '@modules/course/services/course.service.interface';
import { Provider } from '@nestjs/common';

export const CourseServiceProvider: Provider = {
  provide: ICourseService,
  useClass: CourseService,
};

export const CourseEnrollmentServiceProvider: Provider = {
  provide: ICourseEnrollmentService,
  useClass: CourseEnrollmentService,
};

export const CourseMaterialServiceProvider: Provider = {
  provide: ICourseMaterialService,
  useClass: CourseMaterialService,
};
