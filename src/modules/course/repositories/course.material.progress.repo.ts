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

  async getCourseOverallProgressPercentage(
    courseEnrollmentId: string,
  ): Promise<number> {
    const setValue = await this._courseMaterialProgressEntity.aggregate({
      where: {
        courseEnrollmentId: courseEnrollmentId,
      },
      _sum: {
        progressPercentage: true,
      },
    });

    return setValue._sum.progressPercentage;
  }

  async upsertCourseMaterialProgess(
    courseEnrollmentId: string,
    courseMaterialId: string,
    progressPercentage: number,
  ): Promise<string> {
    const progress = await this._courseMaterialProgressEntity.upsert({
      select: {
        id: true,
      },
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

    return progress.id;
  }
}
