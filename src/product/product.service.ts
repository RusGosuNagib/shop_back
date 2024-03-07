import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Products } from './product.entity';
import { CreateProductDto } from './DTO';
import { ProductDto } from './DTO/product.dto';

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

  async removeProduct(id): Promise<boolean> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      return false;
    }
    await this.entityManager.removeAndFlush(product);
    return true;
  }

  async updateProduct(
    productDto: CreateProductDto,
    id: number,
  ): Promise<ProductDto | boolean> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      return false;
    }
    product.title = productDto.title;
    product.type = productDto.type;
    product.photo = productDto.photo;
    product.info = productDto.info;
    product.price = productDto.price;
    await this.entityManager.persistAndFlush(product);
    return product.toJSON();
  }

  async findById(id: number): Promise<ProductDto | boolean> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      return false;
    }
    return product.toJSON();
  }
  async findByIds(ids: number[]): Promise<Products[]> {
    return await this.productRepository.find(ids);
  }
  async findPaginate(
    type: number,
    limit: number,
    offset: number,
  ): Promise<ProductDto[]> {
    const products = await this.productRepository.find(
      { type: type },
      {
        populate: false,
        orderBy: { title: 'asc' },
        limit: limit,
        offset: offset,
      },
    );
    return products.map((product) => product.toJSON());
  }
}
