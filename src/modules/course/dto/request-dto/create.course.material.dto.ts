import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCourseMaterialDto {
  constructor(props: CreateCourseMaterialDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pdfUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  quizUrl: string;
}
