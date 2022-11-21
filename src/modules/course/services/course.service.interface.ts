import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
import { UpdateCourseDto } from '@modules/course/dto/request-dto/update.course.dto';

///////////////////////////////

export const ICourseService = Symbol('ICourseService');

export interface ICourseService {
  createCourse(
    requestDto: CreateCourseDto,
    user: JwtUserDataDto,
  ): boolean | PromiseLike<boolean>;

  updateCourse(id: string, requestDto: UpdateCourseDto): Promise<boolean>;
}
