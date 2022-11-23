import { ICourseMaterialProgressRepository } from '@modules/course/repositories/course.material.progress.repo.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class CourseMaterialProgressRepository
  implements ICourseMaterialProgressRepository
{
  /**
   *
   */

  private _courseMaterialProgressEntity: Prisma.CourseMaterialProgressDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseMaterialProgressEntity = prismaService.courseMaterialProgress;
  }

  async upsertCourseMaterialProgess(
    courseEnrollmentId: string,
    courseMaterialId: string,
    progressPercentage: number,
  ): Promise<boolean> {
    await this._courseMaterialProgressEntity.upsert({
      where: {
        courseMaterialId_courseEnrollmentId: {
          courseEnrollmentId: courseEnrollmentId,
          courseMaterialId: courseMaterialId,
        },
      },
      update: {
        progressPercentage: progressPercentage,
      },
      create: {
        progressPercentage: progressPercentage,
        courseEnrollment: {
          connect: {
            id: courseEnrollmentId,
          },
        },
        courseMaterial: {
          connect: {
            id: courseMaterialId,
          },
        },
      },
    });

    return true;
  }
}
