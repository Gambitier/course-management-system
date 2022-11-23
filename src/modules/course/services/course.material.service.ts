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

  async getCourseMaterials(courseId: string): Promise<any> {
    const materials = await this._courseMaterialRepository.getCourseMaterials(
      courseId,
    );

    return materials;
  }
}
