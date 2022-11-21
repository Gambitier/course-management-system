import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('UsernamePasswordStrategy') {}

@Injectable()
export class JwtQueryParamGuard extends AuthGuard('JwtQueryParamStrategy') {}
