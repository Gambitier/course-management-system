import {
  CourseEnrollmentRepositoryProvider,
  CourseRepositoryProvider,
} from '@modules/course/repo.providers';
import { CourseServiceProvider } from '@modules/course/service.providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CourseServiceProvider,
    CourseRepositoryProvider,
    CourseEnrollmentRepositoryProvider,
  ],
  exports: [
    CourseServiceProvider,
    CourseRepositoryProvider,
    CourseEnrollmentRepositoryProvider,
  ],
})
export class CourseModule {}
