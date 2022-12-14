import { BaseSearchResults } from '@common/types/base.search.dto';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
import { CourseSearchCourse } from '@modules/course/dto/request-dto/search.course.dto';
import { UpdateCourseDto } from '@modules/course/dto/request-dto/update.course.dto';
import { CourseDto } from '@modules/course/dto/response-dto/course.dto';

///////////////////////////////

export const ICourseService = Symbol('ICourseService');

export interface ICourseService {
  searchCourse(
    searchDTO: CourseSearchCourse,
    unaaprovedOnly: boolean,
  ): Promise<BaseSearchResults<CourseDto>>;

  approveCourse(
    courseId: string,
    user: JwtUserDataDto,
  ): boolean | PromiseLike<boolean>;

  getCourseById(courseId: string): Promise<CourseDto>;

  deleteCourse(courseId: string): boolean | PromiseLike<boolean>;
  createCourse(
    requestDto: CreateCourseDto,
    user: JwtUserDataDto,
  ): Promise<string>;

  updateCourse(id: string, requestDto: UpdateCourseDto): Promise<boolean>;
}
