import {
  CourseMaterialDomainModel,
  CreateCourseMaterialDomainModel,
} from '@modules/course/domain.types/course-material/course.material.domain.model';

///////////////////////////////

export const ICourseMaterialRepository = Symbol('ICourseMaterialRepository');

export interface ICourseMaterialRepository {
  createCourseMaterial(
    courseId: string,
    userId: string,
    requestDto: CreateCourseMaterialDomainModel,
  ): Promise<CourseMaterialDomainModel>;

  getCourseMaterials(courseId: string): Promise<CourseMaterialDomainModel[]>;
}
