import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../../domain/errors/domain-error';
import { ProductNotFoundError } from '../../domain/errors/product-errors';
import { ProductEmptyUpdateError } from '../../domain/errors/product-errors';
import { InvalidProductDataError } from '../../domain/errors/product-errors';
import { ProductPriceError } from '../../domain/errors/product-errors';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // Mapeia diferentes tipos de erro para status HTTP apropriados
    if (exception instanceof ProductNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof ProductEmptyUpdateError) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InvalidProductDataError) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof ProductPriceError) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
} 