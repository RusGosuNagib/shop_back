import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO';
import { ProductDto } from './DTO/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * @returns Products
   */
  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  /**
   * @param createProductDto
   * @returns Product
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  /**
   * @param id
   */
  @Get(':id')
  async findById(@Param() id: number): Promise<ProductDto> {
    return await this.productService.findById(id);
  }

  /**
   * @param id
   * @param createProductDto
   * @returns Product
   */
  @Put(':id')
  async updateProduct(
    @Param() id: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(createProductDto, id);
  }

  /**
   * @param id
   * @returns bool
   */
  @Delete(':id')
  async remove(@Param() id: number): Promise<boolean> {
    return await this.productService.removeProduct(id);
  }
}
