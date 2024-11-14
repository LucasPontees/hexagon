import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { Product } from '../../infrastructure/entities/product.entity';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    try {
      return await this.productService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
}
