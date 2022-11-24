import { CourseEnrollmeentDomainModel } from '@modules/course/domain.types/course-enrollment/course.enrollment.domain.model';
import { ICourseEnrollmentRepository } from '@modules/course/repositories/course.enrollment.repo.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { UniqueConstraintFailedError } from '@modules/database-error-handler/errors';
import { PrismaError } from '@modules/database-error-handler/prisma/enums/prisma.error.code.enum';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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

  async getUserCourseEnrollmentProgress(userId: string, courseId: string) {
    return this._courseEnrollmentEntity.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
      select: {
        progress: true,
        progressReward: true,
      },
    });
  }

  async isCourseEnrollmentBelongsToUser(
    userId: string,
    courseEnrollmentId: string,
  ): Promise<boolean> {
    try {
      await this._courseEnrollmentEntity.findFirstOrThrow({
        where: {
          userId: userId,
          id: courseEnrollmentId,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  async getCourseEnrollments(
    courseId: string,
  ): Promise<CourseEnrollmeentDomainModel[]> {
    const data = await this._courseEnrollmentEntity.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return data as unknown as CourseEnrollmeentDomainModel[];
  }

  async enrollForCourse(courseId: string, userId: string): Promise<boolean> {
    try {
      await this._courseEnrollmentEntity.create({
        data: {
          course: {
            connect: {
              id: courseId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === PrismaError.UniqueConstraintViolation
      ) {
        throw new UniqueConstraintFailedError(
          'userId & courseId',
          'User is already enrolled for the course',
        );
      } else {
        this._databaseErrorHandler.HandleError(err);
      }
    }

    return true;
  }
}
