import { CourseMaterialDomainModel } from '@modules/course/domain.types/course-material/course.material.domain.model';
import { ICourseMaterialRepository } from '@modules/course/repositories/course.material.repo.interface';
import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CourseMaterial, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

/////////////////////////////////////////////////////

@Injectable()
export class CourseMaterialRepository implements ICourseMaterialRepository {
  /**
   *
   */

  private _courseMaterialEntity: Prisma.CourseMaterialDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prismaService: PrismaService,

    @Inject(IDatabaseErrorHandler)
    private _databaseErrorHandler: IDatabaseErrorHandler,
  ) {
    this._courseMaterialEntity = prismaService.courseMaterial;
  }

  async getCourseMaterials(
    courseId: string,
  ): Promise<CourseMaterialDomainModel[]> {
    const data: CourseMaterial[] = await this._courseMaterialEntity.findMany({
      where: {
        courseId: courseId,
      },
    });

    return data;
  }
}
