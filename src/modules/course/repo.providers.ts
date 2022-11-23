import { CourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo';
import { ICourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo.interface';
import { CourseMaterialProgressRepository } from '@modules/course/repositories/course.material.progress.repo';
import { ICourseMaterialProgressRepository } from '@modules/course/repositories/course.material.progress.repo.interface';
import { CourseMaterialRepository } from '@modules/course/repositories/course.material.repo';
import { ICourseMaterialRepository } from '@modules/course/repositories/course.material.repo.interface';
import { ICourseProgressRewardRepository } from '@modules/course/repositories/course.progress.rewards.interface';
import { CourseProgressRewardRepository } from '@modules/course/repositories/course.progress.rewards.repo';
import { CourseRepository } from '@modules/course/repositories/course.repo';
import { ICourseRepository } from '@modules/course/repositories/course.repo.interface';
import { Provider } from '@nestjs/common';

export const CourseRepositoryProvider: Provider = {
  provide: ICourseRepository,
  useClass: CourseRepository,
};

export const CourseEnrollmentRepositoryProvider: Provider = {
  provide: ICourseEnrollmentRepository,
  useClass: CourseEnrollmentRepository,
};

export const CourseMaterialRepositoryProvider: Provider = {
  provide: ICourseMaterialRepository,
  useClass: CourseMaterialRepository,
};

export const CourseMaterialProgressRepositoryProvider: Provider = {
  provide: ICourseMaterialProgressRepository,
  useClass: CourseMaterialProgressRepository,
};

export const CourseProgressRewardRepositoryProvider: Provider = {
  provide: ICourseProgressRewardRepository,
  useClass: CourseProgressRewardRepository,
};
