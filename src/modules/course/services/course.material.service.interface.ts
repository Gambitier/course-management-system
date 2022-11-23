import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';
import { CreateCourseMaterialDto } from '@modules/course/dto/request-dto/create.course.material.dto';

export const ICourseMaterialService = Symbol('ICourseMaterialService');

export interface ICourseMaterialService {
  createCourseMaterial(
    courseId: string,
    id: string,
    requestDto: CreateCourseMaterialDto,
  ): unknown;

  getCourseMaterials(courseId: string): Promise<CourseMaterialDomainModel[]>;
}
