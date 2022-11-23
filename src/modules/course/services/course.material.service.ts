import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';
import { CreateCourseMaterialDto } from '@modules/course/dto/request-dto/create.course.material.dto';
import { ICourseMaterialRepository } from '@modules/course/repositories/course.material.repo.interface';
import { ICourseMaterialService } from '@modules/course/services/course.material.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CourseMaterialService implements ICourseMaterialService {
  /**
   *
   */
  constructor(
    @Inject(ICourseMaterialRepository)
    private _courseMaterialRepository: ICourseMaterialRepository,
  ) {}

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
