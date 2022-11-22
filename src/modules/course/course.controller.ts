import { APIResponse } from '@common/types';
import { BaseSearchResults } from '@common/types/base.search.dto';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CreateCourseDto } from '@modules/course/dto/request-dto/create.course.dto';
import { CourseSearchCourse } from '@modules/course/dto/request-dto/search.course.dto';
import { UpdateCourseDto } from '@modules/course/dto/request-dto/update.course.dto';
import { CourseDto } from '@modules/course/dto/response-dto/course.dto';
import { ICourseService } from '@modules/course/services/course.service.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(
    @Inject(ICourseService)
    private readonly _courseService: ICourseService,
  ) {}

  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
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

  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put(':courseId')
  async updateCourse(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
    @Body() requestDto: UpdateCourseDto,
  ): Promise<APIResponse> {
    const status: boolean = await this._courseService.updateCourse(
      courseId,
      requestDto,
    );

    const apiResponse: APIResponse = {
      message: 'Course updated successfully!',
      data: status,
    };

    return apiResponse;
  }

  @Roles(UserRoleEnum.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @Put(':courseId/approve')
  async approveCourse(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;
    const status: boolean = await this._courseService.approveCourse(
      courseId,
      user,
    );

    const apiResponse: APIResponse = {
      message: 'Course approved successfully!',
      data: status,
    };

    return apiResponse;
  }

  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':courseId')
  async deleteCourse(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const status: boolean = await this._courseService.deleteCourse(courseId);

    const apiResponse: APIResponse = {
      message: 'Course deleted successfully!',
      data: status,
    };

    return apiResponse;
  }

  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async searchCourse(
    @Request() req,
    @Query() searchDTO: CourseSearchCourse,
  ): Promise<APIResponse> {
    const courses: BaseSearchResults<CourseDto> =
      await this._courseService.searchCourse(searchDTO);

    const apiResponse: APIResponse = {
      message: 'Fetched list successfully!',
      data: courses,
    };

    return apiResponse;
  }

  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get(':courseId')
  async getCourseById(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const data: CourseDto = await this._courseService.getCourseById(courseId);

    const apiResponse: APIResponse = {
      message: 'Retrieved course by id',
      data: data,
    };

    return apiResponse;
  }
}
