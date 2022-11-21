/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIResponse } from '@common/types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/////////////////////////////////////////////////////////////////////

@Injectable()
export class APIResponseInterceptor implements NestInterceptor {
  /**
   *
   */
  constructor(private reflector: Reflector) {}

  responseHandler = (response: APIResponse) => {
    const apiResponse = {
      status: response.status ?? 'Suceess',
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
    };

    return apiResponse;
  };

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request: Request = httpContext.getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: Response = httpContext.getRequest();

    return next.handle().pipe(
      map(async (data: any) => {
        if (data instanceof StreamableFile || data instanceof Buffer) {
          return data;
        }

        return this.responseHandler(data);
      }),
    );
  }
}
