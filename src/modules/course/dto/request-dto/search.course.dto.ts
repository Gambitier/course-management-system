import { SortOrder as SortOrderEnum } from '@common/enums/resourse.sort.order.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum CourseSortByEnum {
  Category = 'category',
  CreatedAt = 'createdAt',
}

export class CourseSearchCourse {
  constructor(props: CourseSearchCourse) {
    Object.assign(this, props);
  }

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  readonly sortOrder?: SortOrderEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(CourseSortByEnum)
  readonly sortBy?: CourseSortByEnum;

  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  readonly limit: number;

  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  readonly offset: number;
}
