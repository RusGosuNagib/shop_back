import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO';
import { ProductDto } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Delete()
  removeProduct(): string {
    return 'This action returns bool';
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
}
