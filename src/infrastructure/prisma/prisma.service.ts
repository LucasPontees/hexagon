import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../application/interfaces/product-repository.interface';
import { Product } from '../../domain/models/product.model';

@Injectable()
export class PrismaService extends PrismaClient implements ProductRepository {
  async create(product: Product): Promise<Product> {
    const createdProduct = await this.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
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
  }

  async findAll(): Promise<Product[]> {
    const products = await this.product.findMany();
    return products.map((p) => new Product(
      p.id,
      p.name,
      p.description,
      p.price,
      p.createdAt,
      p.updatedAt,
    ));
  }
}
