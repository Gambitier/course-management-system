import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  constructor(props: CourseDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  videoUrl: string;

  @ApiProperty()
  topics: string[];

  @ApiProperty()
  durationMinutes: number;

  @ApiProperty()
  category: string;
}
