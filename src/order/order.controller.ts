import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { OrderService } from './order.service';
import { ProductService } from '../product/product.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
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
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  /**
   * Remove an order by ID
   * @param id - The ID of the order to remove
   * @returns A boolean indicating if the order was successfully removed
   */
  @Delete(':id')
  async removeOrder(@Param('id') id: number) {
    return await this.orderService.removeOrder(id);
  }

  /**
   * not used
   *
   * Update an order by ID
   * @param id - The ID of the order to update
   * @param updateOrderDto - The data to update the order with
   * @returns The updated order
   */
  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() updateOrderDto: OrderDto) {
    return false;
    const ids = updateOrderDto.products.map((product) => product.id);
    return await this.productService.findByIds(ids);
  }
}
