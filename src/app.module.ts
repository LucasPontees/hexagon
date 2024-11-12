import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './infrastructure/filters/domain-exception.filter';

import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
