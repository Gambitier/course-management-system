import { SortOrder } from '@common/enums/resourse.sort.order.enum';
import { BaseSearchResults } from '@common/types/base.search.dto';
import {
  CourseDomainModel,
  CreateCourseDomainModel,
  UpdatCourseDomainModel,
} from '@modules/course/domain.types/course';
import {
  CourseSearchCourse,
  CourseSortByEnum,
} from '@modules/course/dto/request-dto/search.course.dto';
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
    private prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseEntity = prismaService.course;
  }

  async searchCourse(
    searchDTO: CourseSearchCourse,
    unaaprovedOnly: boolean,
  ): Promise<BaseSearchResults<CourseDomainModel>> {
    const findConditions: Prisma.CourseWhereInput[] = [];

    if (unaaprovedOnly) {
      findConditions.push({
        approvedAt: null,
      });
    } else {
      findConditions.push({
        approvedAt: {
          not: null,
        },
      });
    }

    findConditions.push({
      deleted: null,
    });

    if (searchDTO.title) {
      findConditions.push({
        title: {
          contains: searchDTO.title,
          mode: 'insensitive',
        },
      });
    }

    const sortOrder: Prisma.SortOrder =
      searchDTO.sortOrder === SortOrder.Ascending
        ? Prisma.SortOrder.asc
        : Prisma.SortOrder.desc;

    let orderBy: Prisma.CourseOrderByWithRelationInput;
    switch (searchDTO.sortBy) {
      case CourseSortByEnum.Category:
        orderBy = {
          category: sortOrder,
        };
        break;
      default:
      case CourseSortByEnum.CreatedAt:
        orderBy = {
          createdAt: sortOrder,
        };
        break;
    }

    const countQuery = this._courseEntity.count({
      where: {
        AND: findConditions,
      },
    });

    const findQuery = this._courseEntity.findMany({
      where: {
        AND: findConditions,
      },
      orderBy: orderBy,
      skip: searchDTO.offset,
      take: searchDTO.limit,
    });

    const [totalCount, courses]: [number, Course[]] =
      await this.prismaService.$transaction([countQuery, findQuery]);

    const response: BaseSearchResults<CourseDomainModel> = {
      TotalCount: totalCount,
      RetrievedCount: courses.length,
      Result: courses,
    };

    return response;
  }

  async approveCourse(courseId: string, userId: string): Promise<boolean> {
    try {
      await this._courseEntity.update({
        data: {
          approvedAt: new Date(),
          approvedBy: {
            connect: {
              id: userId,
            },
          },
        },
        where: {
          id: courseId,
        },
      });
    } catch (err) {
      this._databaseErrorHandler.HandleError(err);
    }

    return true;
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
        data: {
          ...domainModel,
          approvedBy: null,
          approvedAt: null,
        },
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
