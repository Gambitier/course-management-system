import {
  CourseDomainModel,
  CreateCourseDomainModel,
  UpdatCourseDomainModel,
} from '@modules/course/domain.types/course';

///////////////////////////////

export const ICourseRepository = Symbol('ICourseRepository');

export interface ICourseRepository {
  createCourse(
    createDomainModel: CreateCourseDomainModel,
  ): Promise<CourseDomainModel>;

  updateCourse(
    id: string,
    createDomainModel: UpdatCourseDomainModel,
  ): Promise<CourseDomainModel>;
}
