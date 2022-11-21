import {
  CourseDomainModel,
  CreateCourseDomainModel,
  UpdatCourseDomainModel,
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

  async getCourseById(courseId: string): Promise<CourseDomainModel> {
    try {
      const data = await this._courseEntity.findFirstOrThrow({
        where: {
          id: courseId,
          deleted: null,
        },
      });

      return data;
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }
  }

  async deleteCourse(courseId: string): Promise<boolean> {
    try {
      await this._courseEntity.update({
        where: {
          id: courseId,
        },
        data: {
          deleted: new Date(),
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return true;
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

  async updateCourse(
    id: string,
    domainModel: UpdatCourseDomainModel,
  ): Promise<CourseDomainModel> {
    let entity: Course;

    try {
      entity = await this._courseEntity.update({
        data: domainModel,
        where: {
          id: id,
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return entity;
  }
}
