import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  findAll(): string {
    //removeProduct
    return 'This action returns all prods';
  }
  @Delete()
  removeProduct(): string {
    return 'This action returns bool';
  }
  @Post()
  create(): string {
    return 'This action adds a new prod';
  }
}
