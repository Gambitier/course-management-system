import { compareHash, hashData } from '@common/utils';
import { UserRoleEnum } from '@modules/auth/common';
import { UpdatePasswordDto } from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { IAuthService } from '@modules/auth/services/auth.service.interface';
import { jwtConstants } from '@modules/auth/strategies/constants';
import { TokenDto } from '@modules/auth/types/token.type';
import { UserDomainModel } from '@modules/user/domain.types/user';
import { UserRoleDto } from '@modules/user/dto';
import { IUserService } from '@modules/user/services/user.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/////////////////////////////////////////////////////

@Injectable()
export class AuthService implements IAuthService {
  /**
   *
   */
  constructor(
    private jwtService: JwtService,

    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {
    //
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDomainModel; token: TokenDto }> {
    const user: UserDomainModel = await this.userService.createUser({
      ...signupDto,
      password: hashData(signupDto.password),
      userRoles: [UserRoleEnum.EMPLOYEE],
    });

    const token = await this.getToken(user);

    return {
      user: user,
      token: token,
    };
  }

  async resetPassword(
    resetPasswordDto: UpdatePasswordDto,
    jwtUserData: JwtUserDataDto,
  ): Promise<boolean> {
    const user: UserDomainModel = await this.userService.findFirstByIdOrThrow(
      jwtUserData.id,
    );

    const passwordMatch: boolean = compareHash(
      resetPasswordDto.newPassword,
      user.password,
    );

    if (passwordMatch) {
      return true; // password changed!
    }

    const status: boolean = await this.userService.resetUserPassword(
      resetPasswordDto,
      jwtUserData.id,
    );

    return status;
  }

  async login(user: UserDomainModel): Promise<TokenDto> {
    const token = await this.getToken(user);
    return token;
  }

  private getToken = async (user: UserDomainModel): Promise<TokenDto> => {
    const userDataForToken: JwtUserDataDto = {
      id: user.id,
      prefix: user.prefix,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      userRoles: user.userRoles.map((role) => {
        const dto: UserRoleDto = {
          id: role.id,
          role: role.role,
          userId: role.userId,
          createdAt: role.createdAt,
        };

        return dto;
      }),
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.at_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),

      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.rt_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),
    ]);

    const token: TokenDto = {
      accessToken: at,
      refreshToken: rt,
    };

    return token;
  };
}
