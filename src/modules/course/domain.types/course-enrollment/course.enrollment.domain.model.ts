import { CourseDomainModel } from '@modules/course/domain.types/course/course.domain.model';
import { UserDomainModel } from '@modules/user/domain.types/user';

export type CourseEnrollmeentDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deleted?: Date;
  user?: UserDomainModel;
  course?: CourseDomainModel;
};
