import { generatePassword, hashData } from '@common/utils';
import { GenderEnum } from '@modules/user/enums/gender.enum';
import { UserPrefixEnum } from '@modules/user/enums/user.prefix.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import * as _ from 'lodash';

export class SignupDto {
  constructor(props: SignupDto) {
    Object.assign(this, props);
  }

  @ApiProperty()
  @IsString()
  prefix: UserPrefixEnum;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@yopmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @Length(10, 10)
  phone: string;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum = GenderEnum.UNSPECIFIED;

  @ApiProperty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  @Transform(
    ({ value }) => {
      if (_.isEmpty(value)) {
        value = generatePassword();
      }
      return hashData(value);
    },
    { toClassOnly: true },
  )
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middleName?: string;
}
