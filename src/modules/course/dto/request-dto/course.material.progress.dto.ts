import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CourseMaterialProgressDto {
  constructor(props: CourseMaterialProgressDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage: number;
}
