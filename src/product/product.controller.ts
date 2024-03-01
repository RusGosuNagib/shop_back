import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './DTO';
import { ProductDto } from './DTO/product.dto';
import { UserService } from '../user/user.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  /**
   * @returns Products
   */
  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  /**
   * @param createProductDto
   * @param key
   * @returns Product
   */
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Headers('key') key: string,
  ) {
    if (await this.userService.validateToken(key)) {
      return await this.productService.create(createProductDto);
    }
    return false;
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
   * @param key
   * @returns Product
   */
  @Put(':id')
  async updateProduct(
    @Param() id: number,
    @Body() createProductDto: CreateProductDto,
    @Headers('key') key: string,
  ): Promise<ProductDto | boolean> {
    if (await this.userService.validateToken(key)) {
      return await this.productService.updateProduct(createProductDto, id);
    }
    return false;
  }

  /**
   * @param id
   * @param key
   * @returns bool
   */
  @Delete(':id')
  async remove(
    @Param() id: number,
    @Headers('key') key: string,
  ): Promise<boolean> {
    if (await this.userService.validateToken(key)) {
      return await this.productService.removeProduct(id);
    }
    return false;
  }
}
