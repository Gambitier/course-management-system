import { IDatabaseErrorHandler } from '@modules/database-error-handler/database.error.handler.interface';
import {
  DataNotFoundError,
  UniqueConstraintFailedError,
} from '@modules/database-error-handler/errors';
import { PrismaError } from '@modules/database-error-handler/prisma/enums/prisma.error.code.enum';
import { Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

/////////////////////////////////////////////////////////////////////

@Injectable()
export class PrismaDatabaseErrorHandler implements IDatabaseErrorHandler {
  HandleError(error: any): void {
    this.HandlePrismaErrors(error);
  }

  HandlePrismaErrors = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
      const exception = error as PrismaClientKnownRequestError;
      this.HandlePrismaClientKnownRequestError(exception);
    } else if (error instanceof PrismaClientValidationError) {
      const exception = error as PrismaClientValidationError;
      this.HandlePrismaClientValidationError(exception);
    } else if (error.name === 'NotFoundError') {
      throw new DataNotFoundError(error.message);
    }

    throw error;
  };

  HandlePrismaClientKnownRequestError(error: PrismaClientKnownRequestError) {
    const errorCode = error.code;

    switch (errorCode) {
      case PrismaError.UniqueConstraintViolation: {
        const fieldName = (error.meta.target as string[]).join(' & ');
        const msg = `${fieldName} already in use`;
        throw new UniqueConstraintFailedError(fieldName, msg);
      }
    }
  }

  HandlePrismaClientValidationError(exception: PrismaClientValidationError) {
    // https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror
    // Prisma Client throws a PrismaClientValidationError exception if validation fails
    throw new Error(exception.message);
  }
}
