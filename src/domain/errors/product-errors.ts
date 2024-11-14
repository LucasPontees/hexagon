import { DomainError } from './domain-error';

export class ProductNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Produto com ID ${id} não foi encontrado`);
  }
}

export class ProductEmptyUpdateError extends DomainError {
  constructor() {
    super('Nenhum dado foi fornecido para atualização');
  }
}

export class InvalidProductDataError extends DomainError {
  constructor(message: string) {
    super(`Dados do produto inválidos: ${message}`);
  }
}

export class ProductPriceError extends DomainError {
  constructor() {
    super('O preço do produto deve ser maior que zero');
  }
}

export class ProductUpdateError extends DomainError {
  constructor(message: string) {
    super(`Erro ao atualizar produto: ${message}`);
  }
} 