import { Injectable } from '@nestjs/common';
import { Product } from '../../infrastructure/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { 
  ProductNotFoundError,
  InvalidProductDataError,
  ProductPriceError 
} from '../../domain/errors/product-errors';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.price <= 0) {
      throw new ProductPriceError();
    }

    try {
      const createdProduct = await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description || null,
          price: createProductDto.price,
        },
      });

      return new Product(
        createdProduct.id,
        createdProduct.name,
        createdProduct.description,
        createdProduct.price,
        createdProduct.createdAt,
        createdProduct.updatedAt,
      );
    } catch (error) {
      throw new InvalidProductDataError(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany();
    return products.map(
      (p) =>
        new Product(
          p.id,
          p.name,
          p.description,
          p.price,
          p.createdAt,
          p.updatedAt,
        ),
    );
  }

  async delete(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ProductNotFoundError(id);
    }
    
    return this.prismaService.product.delete({ where: { id } });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ProductNotFoundError(id);
    }

    return new Product(
      product.id,
      product.name,
      product.description,
      product.price,
      product.createdAt,
      product.updatedAt,
    );
  }
}
