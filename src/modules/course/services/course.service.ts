import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import {
  CourseDomainModel,
  CreateCourseDomainModel,
} from '@modules/course/domain.types/course';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
import { UpdateCourseDto } from '@modules/course/dto/request-dto/update.course.dto';
import { CourseDto } from '@modules/course/dto/response-dto/course.dto';
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

  async getCourseById(courseId: string): Promise<CourseDto> {
    const data: CourseDomainModel = await this._courseRepository.getCourseById(
      courseId,
    );

    return data;
  }

  async deleteCourse(courseId: string): Promise<boolean> {
    await this._courseRepository.deleteCourse(courseId);
    return true;
  }

  async createCourse(
    requestDto: CreateCourseDto,
    user: JwtUserDataDto,
  ): Promise<boolean> {
    const createDomainModel: CreateCourseDomainModel = {
      ...requestDto,
      createdByUserId: user.id,
    };
    await this._courseRepository.createCourse(createDomainModel);
    return true;
  }

  async updateCourse(
    id: string,
    requestDto: UpdateCourseDto,
  ): Promise<boolean> {
    await this._courseRepository.updateCourse(id, requestDto);
    return true;
  }
}
