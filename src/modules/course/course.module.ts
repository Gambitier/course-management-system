import { CourseController } from '@modules/course/controllers/course.controller';
import { CourseEnrollmentController } from '@modules/course/controllers/course.enrollment.controller';
import {
  CourseEnrollmentRepositoryProvider,
  CourseRepositoryProvider,
} from '@modules/course/repo.providers';
import { CourseServiceProvider } from '@modules/course/service.providers';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CourseController, CourseEnrollmentController],
  providers: [
    PrismaService,
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
