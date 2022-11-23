import { CourseController } from '@modules/course/controllers/course.controller';
import { CourseEnrollmentController } from '@modules/course/controllers/course.enrollment.controller';
import { CourseMaterialController } from '@modules/course/controllers/course.material.controller';
import {
  CourseEnrollmentRepositoryProvider,
  CourseMaterialRepositoryProvider,
  CourseRepositoryProvider,
} from '@modules/course/repo.providers';
import {
  CourseEnrollmentServiceProvider,
  CourseMaterialServiceProvider,
  CourseServiceProvider,
} from '@modules/course/service.providers';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [
    CourseController,
    CourseEnrollmentController,
    CourseMaterialController,
  ],
  providers: [
    PrismaService,
    CourseServiceProvider,
    CourseEnrollmentServiceProvider,
    CourseRepositoryProvider,
    CourseEnrollmentRepositoryProvider,
    CourseMaterialServiceProvider,
    CourseMaterialRepositoryProvider,
  ],
  exports: [
    CourseServiceProvider,
    CourseServiceProvider,
    CourseEnrollmentServiceProvider,
    CourseMaterialServiceProvider,
  ],
})
export class CourseModule {}
