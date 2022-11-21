import { AuthModule } from '@modules/auth/auth.module';
import { JwtGuard, RolesGuard } from '@modules/auth/common';
import { CourseModule } from '@modules/course/course.module';
import { DatabaseErrorHandlerModule } from '@modules/database-error-handler/database.error.handler.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { logggerModuleConfig } from 'src/configs';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { APIResponseInterceptor } from 'src/interceptors/api.response.interceptor';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports: [
    LoggerModule.forRootAsync(logggerModuleConfig),
    UserModule,
    AuthModule,
    DatabaseErrorHandlerModule,
    CourseModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: APIResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server modules 📡 ');
  }

  onApplicationBootstrap(): void {
    console.log('Initialized server, waiting for requests 🚀');
  }
}
