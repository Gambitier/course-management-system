import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCourseMaterialDto {
  constructor(props: CreateCourseMaterialDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  pdfUrl: string;

  @ApiProperty()
  @IsString()
  quizUrl: string;
}
