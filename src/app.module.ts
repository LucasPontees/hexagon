import { Module } from '@nestjs/common';

import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ProductController } from './presentation/controllers/product.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}
