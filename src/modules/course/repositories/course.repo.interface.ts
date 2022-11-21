import {
  CourseDomainModel,
  CreateCourseDomainModel,
} from '@modules/course/domain.types/course';

///////////////////////////////

export const ICourseRepository = Symbol('ICourseRepository');

export interface ICourseRepository {
  createCourse(
    createDomainModel: CreateCourseDomainModel,
  ): Promise<CourseDomainModel>;
}
