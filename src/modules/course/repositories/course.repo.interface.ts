import {
  CourseDomainModel,
  CreateCourseDomainModel,
  UpdatCourseDomainModel,
} from '@modules/course/domain.types/course';

///////////////////////////////

export const ICourseRepository = Symbol('ICourseRepository');

export interface ICourseRepository {
  approveCourse(courseId: string, userId: string): Promise<boolean>;
  getCourseById(courseId: string): Promise<CourseDomainModel>;

  deleteCourse(courseId: string): Promise<boolean>;
  createCourse(
    createDomainModel: CreateCourseDomainModel,
  ): Promise<CourseDomainModel>;

  updateCourse(
    id: string,
    createDomainModel: UpdatCourseDomainModel,
  ): Promise<CourseDomainModel>;
}
