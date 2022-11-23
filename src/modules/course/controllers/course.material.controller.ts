import { APIResponse } from '@common/types';
import { Roles, UserRoleEnum } from '@modules/auth/common';
import { ICourseMaterialService } from '@modules/course/services/course.material.service.interface';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
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
}
