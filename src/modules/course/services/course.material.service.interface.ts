import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';

export const ICourseMaterialService = Symbol('ICourseMaterialService');

export interface ICourseMaterialService {
  getCourseMaterials(courseId: string): Promise<CourseMaterialDomainModel[]>;
}
