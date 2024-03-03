import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}
  /**
   * Create a new order
   * @param createOrderDto - The data for the new order
   * @returns The newly created order
   */
  @Post()
  async createOrder(@Body() createOrderDto: OrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  /**
   * Get all orders
   * @returns A list of all orders
   */
  @Get()
  async getAllOrders(
    @Headers('secure_token')
    secureToken: string,
  ) {
    if (await this.userService.validateToken(secureToken)) {
      return await this.orderService.getAllOrders();
    }
    return false;
  }

  /**
   * Remove an order by ID
   * @param secureToken
   * @param id - The ID of the order to remove
   * @returns A boolean indicating if the order was successfully removed
   */
  @Delete(':id')
  async removeOrder(
    @Param('id')
    id: number,
    @Headers('secure_token')
    secureToken: string,
  ) {
    if (await this.userService.validateToken(secureToken)) {
      return await this.orderService.removeOrder(id);
    }
    return false;
  }

  /**
   * not used
   *
   * Update an order by ID
   * @param id - The ID of the order to update
   * @param updateOrderDto - The data to update the order with
   * @param secureToken
   * @returns The updated order
   */
  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: OrderDto,
    @Headers('secure_token')
    secureToken: string,
  ) {
    return false;
    if (await this.userService.validateToken(secureToken)) {
      return await this.orderService.updateOrder(id, updateOrderDto);
    }
    return false;
  }
}
