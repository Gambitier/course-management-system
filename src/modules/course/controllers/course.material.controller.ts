import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CreateCourseMaterialDto } from '@modules/course/dto/request-dto/create.course.material.dto';
import { ICourseMaterialService } from '@modules/course/services/course.material.service.interface';
import {
  Body,
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
@ApiTags('course-materials')
@Controller('course-materials')
export class CourseMaterialController {
  constructor(
    @Inject(ICourseMaterialService)
    private readonly _courseMaterialService: ICourseMaterialService,
  ) {}

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPERADMIN, UserRoleEnum.EMPLOYEE)
  @HttpCode(HttpStatus.OK)
  @Get(':courseId')
  async getCourseMaterials(
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
  ): Promise<APIResponse> {
    const materials = await this._courseMaterialService.getCourseMaterials(
      courseId,
    );

    const apiResponse: APIResponse = {
      message: 'Retrieved course materials',
      data: materials,
    };

    return apiResponse;
  }

  @Roles(UserRoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post(':courseId')
  async createCourseMaterial(
    @Request() req,
    @Param('courseId', new ParseUUIDPipe()) courseId: string,
    @Body() requestDto: CreateCourseMaterialDto,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;

    await this._courseMaterialService.createCourseMaterial(
      courseId,
      user.id,
      requestDto,
    );

    const apiResponse: APIResponse = {
      message: 'created course material',
      data: true,
    };

    return apiResponse;
  }
}
