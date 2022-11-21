import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  constructor(props: CreateCourseDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  topics: string[];

  @ApiProperty()
  @IsNumber()
  durationMinutes: bigint;

  @ApiProperty()
  @IsString()
  category: string;
}
