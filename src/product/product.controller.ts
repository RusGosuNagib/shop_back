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
   * @param secureToken
   * @returns Product
   */
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Headers('secure_token') secureToken: string,
  ) {
    if (await this.userService.validateToken(secureToken)) {
      return await this.productService.create(createProductDto);
    }
    return false;
  }

  /**
   * @param id
   */
  @Get(':id')
  async findById(@Param() id: number): Promise<ProductDto | boolean> {
    return await this.productService.findById(id);
  }

  /**
   * @param id
   * @param createProductDto
   * @param secureToken
   * @returns Product
   */
  @Put(':id')
  async updateProduct(
    @Param() id: number,
    @Body() createProductDto: CreateProductDto,
    @Headers('secure_token') secureToken: string,
  ): Promise<ProductDto | boolean> {
    if (await this.userService.validateToken(secureToken)) {
      return await this.productService.updateProduct(createProductDto, id);
    }
    return false;
  }

  /**
   * @param id
   * @param secureToken
   * @returns bool
   */
  @Delete(':id')
  async remove(
    @Param() id: number,
    @Headers('secure_token') secureToken: string,
  ): Promise<boolean> {
    if (await this.userService.validateToken(secureToken)) {
      return await this.productService.removeProduct(id);
    }
    return false;
  }
}
