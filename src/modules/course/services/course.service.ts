import { ICourseRepository } from '@modules/course/repositories/course.repo.interface';
import { ICourseService } from '@modules/course/services/course.service.interface';
import { Inject, Injectable } from '@nestjs/common';

/////////////////////////////////////////////////////

@Injectable()
export class CourseService implements ICourseService {
  /**
   *
   */
  constructor(
    @Inject(ICourseRepository)
    private _courseRepository: ICourseRepository,
  ) {
    //
  }

  test() {
    throw new Error('Method not implemented.');
  }
}
