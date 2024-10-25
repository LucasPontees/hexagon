import { Product } from '../../infrastructure/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
}
