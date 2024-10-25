import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductService } from '../../application/services/product.service';

@Module({
  providers: [PrismaService, ProductService],
  exports: [PrismaService, ProductService],
})
export class PrismaModule {}
