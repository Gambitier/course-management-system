import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import {
  CourseDomainModel,
  CreateCourseDomainModel,
} from '@modules/course/domain.types/course';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
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

  async createCourse(
    requestDto: CreateCourseDto,
    user: JwtUserDataDto,
  ): Promise<boolean> {
    const createDomainModel: CreateCourseDomainModel = {
      ...requestDto,
      createdByUserId: user.id,
    };

    const course: CourseDomainModel = await this._courseRepository.createCourse(
      createDomainModel,
    );

    return true;
  }
}
