import { APIResponse } from '@common/types';
import { AllowAnonymous, LocalAuthGuard } from '@modules/auth/common';
import { LoginDto, UpdatePasswordDto } from '@modules/auth/dto';
import { SignupDto } from '@modules/auth/dto/request-dto/signup.dto';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { IAuthService } from '@modules/auth/services';
import { TokenDto } from '@modules/auth/types/token.type';
import { UserDomainModel } from '@modules/user/domain.types/user';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginApiResponse } from './api.response.types/auth.api.response';

/////////////////////////////////////////////////////////////////////////

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.OK, type: LoginApiResponse })
  @AllowAnonymous() // pass jwt authentication
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<APIResponse> {
    const data: { user: UserDomainModel; token: TokenDto } =
      await this.authService.signup(signupDto);

    const responseEntity: LoginApiResponse = {
      user: data.user,
      token: data.token,
    };

    const apiResponse: APIResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: new LoginApiResponse(responseEntity),
      },
    };

    return apiResponse;
  }

  @ApiBody({ type: LoginDto })
  @AllowAnonymous() // pass jwt authentication
  @UseGuards(LocalAuthGuard) // but authorize with username and pass
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async logIn(@Request() req): Promise<APIResponse> {
    const tokenDto: TokenDto = await this.authService.login(req.user);
    const responseEntity: LoginApiResponse = {
      user: req.user,
      token: tokenDto,
    };

    const apiResponse: APIResponse = {
      message: 'User logged in successfully!',
      data: {
        entity: new LoginApiResponse(responseEntity),
      },
    };
    return apiResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Put('/password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: UpdatePasswordDto,
  ): Promise<APIResponse> {
    const user = req.user as JwtUserDataDto;
    const dto: UpdatePasswordDto = {
      newPassword: changePasswordDto.newPassword,
    };

    const status: boolean = await this.authService.resetPassword(dto, user);

    const apiResponse: APIResponse = {
      message: 'Password changed successfully!',
      data: status,
    };

    return apiResponse;
  }
}
