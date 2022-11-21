import { CourseController } from '@modules/course/course.controller';
import {
  CourseEnrollmentRepositoryProvider,
  CourseRepositoryProvider,
} from '@modules/course/repo.providers';
import { CourseServiceProvider } from '@modules/course/service.providers';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CourseController],
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
