import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional() // A descrição pode ser opcional
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number; // O preço deve ser um número
}
