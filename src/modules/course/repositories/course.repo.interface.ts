import { BaseSearchResults } from '@common/types/base.search.dto';
import {
  CourseDomainModel,
  CreateCourseDomainModel,
  UpdatCourseDomainModel,
} from '@modules/course/domain.types/course';
import { CourseSearchCourse } from '@modules/course/dto/request-dto/search.course.dto';

///////////////////////////////

export const ICourseRepository = Symbol('ICourseRepository');

export interface ICourseRepository {
  searchCourse(
    searchDTO: CourseSearchCourse,
    unaaprovedOnly: boolean,
  ): Promise<BaseSearchResults<CourseDomainModel>>;

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
