import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { ICourseService } from '@modules/course/services/course.service.interface';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('course-enrollments')
@Controller('course-enrollments')
export class CourseEnrollmentController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
  ) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @Get(':courseId')
  async getCourseEnrollmentsById(
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const apiResponse: APIResponse = {
      message: 'Retrieved course by id',
      data: null,
    };

    return apiResponse;
  }

  @Roles(UserRoleEnum.EMPLOYEE)
  @HttpCode(HttpStatus.OK)
  @Post(':courseId')
  async enrollForCourse(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;

    const apiResponse: APIResponse = {
      message: 'Retrieved course by id',
      data: null,
    };

    return apiResponse;
  }
}
