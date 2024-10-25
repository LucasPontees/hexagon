import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/models/product.model';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepository } from '../interfaces/product-repository.interface';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Certifique-se de que estamos usando os dados corretos do DTO
    const createdProduct = await this.prismaService.product.create({
      data: {
        name: createProductDto.name, // Aqui está o valor correto
        description: createProductDto.description || null, // Pode ser null se não fornecido
        price: createProductDto.price, // Certifique-se de que este é um número
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
    const products = await this.prismaService.product.findMany();
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
