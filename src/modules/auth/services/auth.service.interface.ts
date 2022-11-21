import { UpdatePasswordDto } from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { TokenDto } from '@modules/auth/types/token.type';
import { UserDomainModel } from '@modules/user/domain.types/user';

///////////////////////////////////////////////////////////

export const IAuthService = Symbol('IAuthService');

export interface IAuthService {
  signup(
    signupDto: SignupDto,
  ): Promise<{ user: UserDomainModel; token: TokenDto }>;

  resetPassword(
    resetPasswordDto: UpdatePasswordDto,
    user: JwtUserDataDto,
  ): Promise<boolean>;

  login(userDto: UserDomainModel): Promise<TokenDto>;
}
