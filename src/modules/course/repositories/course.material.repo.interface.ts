import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';

///////////////////////////////

export const ICourseMaterialRepository = Symbol('ICourseMaterialRepository');

export interface ICourseMaterialRepository {
  getCourseMaterials(courseId: string): Promise<CourseMaterialDomainModel[]>;
}
