import {
  CourseDomainModel,
  CreateCourseDomainModel,
} from '@modules/course/domain.types/course';
import { ICourseRepository } from '@modules/course/repositories/course.repo.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class CourseRepository implements ICourseRepository {
  /**
   *
   */

  private _courseEntity: Prisma.CourseDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseEntity = prismaService.course;
  }

  async createCourse(
    createDomainModel: CreateCourseDomainModel,
  ): Promise<CourseDomainModel> {
    const createdByUserId = createDomainModel.createdByUserId;
    delete createDomainModel.createdByUserId;

    const data: Prisma.CourseCreateInput = {
      ...createDomainModel,
      createdBy: {
        connect: {
          id: createdByUserId,
        },
      },
    };

    let entity: Course;

    try {
      entity = await this._courseEntity.create({
        data: data,
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return entity;
  }
}
