import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Products } from './product.entity';
import { CreateProductDto } from './DTO';
import { ProductDto } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: EntityRepository<Products>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();

    return products.map((product) => product.toJSON());
  }
  async create(productDto: CreateProductDto): Promise<ProductDto> {
    const product = new Products(
      productDto.title,
      productDto.type,
      productDto.photo,
      productDto.info,
      productDto.price,
    );

    await this.entityManager.persistAndFlush(product);
    return product.toJSON();
  }
}
