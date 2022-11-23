import { ICourseProgressRewardRepository } from '@modules/course/repositories/course.progress.rewards.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class CourseProgressRewardRepository
  implements ICourseProgressRewardRepository
{
  /**
   *
   */

  private _courseProgressRewardDelegate: Prisma.CourseProgressRewardDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseProgressRewardDelegate = prismaService.courseProgressReward;
  }

  async updateCourseRewardPoints(
    courseEnrollmentId: string,
    rewardPoints: number,
    overallProgressPercentage: number,
  ): Promise<string> {
    const rewards = await this._courseProgressRewardDelegate.upsert({
      select: {
        id: true,
      },
      where: {
        courseEnrollmentId: courseEnrollmentId,
      },
      update: {
        progressPercentage: overallProgressPercentage,
        rewardPoints: rewardPoints,
      },
      create: {
        progressPercentage: overallProgressPercentage,
        rewardPoints: rewardPoints,
        courseEnrollment: {
          connect: {
            id: courseEnrollmentId,
          },
        },
      },
    });

    return rewards.id;
  }
}
