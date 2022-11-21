import { CourseService } from '@modules/course/services/course.service';
import { ICourseService } from '@modules/course/services/course.service.interface';
import { Provider } from '@nestjs/common';

export const CourseServiceProvider: Provider = {
  provide: ICourseService,
  useClass: CourseService,
};
