import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';
import { CourseMaterialProgressDto } from '@modules/course/dto/request-dto/course.material.progress.dto';
import { CreateCourseMaterialDto } from '@modules/course/dto/request-dto/create.course.material.dto';
import { ICourseMaterialProgressRepository } from '@modules/course/repositories/course.material.progress.repo.interface';
import { ICourseMaterialRepository } from '@modules/course/repositories/course.material.repo.interface';
import { ICourseEnrollmentService } from '@modules/course/services/course.enrollment.service.interface';
import { ICourseMaterialService } from '@modules/course/services/course.material.service.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CourseMaterialService implements ICourseMaterialService {
  /**
   *
   */
  constructor(
    @Inject(ICourseMaterialRepository)
    private _courseMaterialRepository: ICourseMaterialRepository,
    @Inject(ICourseMaterialProgressRepository)
    private _courseMaterialProgressRepository: ICourseMaterialProgressRepository,
    @Inject(ICourseEnrollmentService)
    private _courseEnrollmentService: ICourseEnrollmentService,
  ) {}

  async upsertCourseMaterialProgess(
    courseEnrollmentId: string,
    courseMaterialId: string,
    requestDto: CourseMaterialProgressDto,
    userId: string,
  ): Promise<any> {
    const courseEnrollmentIsValid: boolean =
      await this._courseEnrollmentService.isCourseEnrollmentBelongsToUser(
        userId,
        courseEnrollmentId,
      );

    if (!courseEnrollmentIsValid) {
      throw new ForbiddenException(
        'You are not authorized to update course progress',
      );
    }

    await this._courseMaterialProgressRepository.upsertCourseMaterialProgess(
      courseEnrollmentId,
      courseMaterialId,
      requestDto.progressPercentage,
    );

    return true;
  }

  async createCourseMaterial(
    courseId: string,
    userId: string,
    requestDto: CreateCourseMaterialDto,
  ): Promise<CourseMaterialDomainModel> {
    const material: CourseMaterialDomainModel =
      await this._courseMaterialRepository.createCourseMaterial(
        courseId,
        userId,
        requestDto,
      );

    return material;
  }

  async getCourseMaterials(
    courseId: string,
  ): Promise<CourseMaterialDomainModel[]> {
    const materials: CourseMaterialDomainModel[] =
      await this._courseMaterialRepository.getCourseMaterials(courseId);

    return materials;
  }
}
