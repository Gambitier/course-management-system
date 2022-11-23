import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { ICourseEnrollmentService } from '@modules/course/services/course.enrollment.service.interface';
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
    @Inject(ICourseEnrollmentService)
    private readonly _courseEnrollmentService: ICourseEnrollmentService,
  ) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @Get(':courseId')
  async getCourseEnrollmentsById(
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const enrollments =
      await this._courseEnrollmentService.getCourseEnrollments(courseId);

    const apiResponse: APIResponse = {
      message: 'Retrieved course by id',
      data: enrollments,
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

    await this._courseEnrollmentService.enrollForCourse(courseId, user.id);

    const apiResponse: APIResponse = {
      message: 'Retrieved course by id',
      data: true,
    };

    return apiResponse;
  }
}
