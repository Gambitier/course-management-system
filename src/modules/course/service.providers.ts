import { CourseEnrollmentService } from '@modules/course/services/course.enrollment.service';
import { ICourseEnrollmentService } from '@modules/course/services/course.enrollment.service.interface';
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
