import { generatePassword, hashData } from '@common/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import * as _ from 'lodash';

export class UpdatePasswordDto {
  /**
   *
   */
  constructor(props: UpdatePasswordDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  @Transform(
    ({ value }) => {
      if (_.isEmpty(value)) {
        value = generatePassword();
      }
      return hashData(value);
    },
    { toClassOnly: true },
  )
  @Expose()
  newPassword: string;
}
