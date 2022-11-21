import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
import { ICourseService } from '@modules/course/services/course.service.interface';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
  ) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createCourse(
    @Request() req,
    @Body() requestDto: CreateCourseDto,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;

    const status: boolean = await this._courseService.createCourse(
      requestDto,
      user,
    );

    const apiResponse: APIResponse = {
      message: 'Course created successfully!',
      data: status,
    };

    return apiResponse;
  }
}
