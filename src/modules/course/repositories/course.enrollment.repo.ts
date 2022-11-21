import { ICourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class CourseEnrollmentRepository implements ICourseEnrollmentRepository {
  /**
   *
   */

  private _courseEnrollmentEntity: Prisma.CourseEnrollmentDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseEnrollmentEntity = prismaService.courseEnrollment;
  }

  test() {
    throw new Error('Method not implemented.');
  }
}
