import { Injectable } from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { Orders } from './order.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
// import { Products } from '../product/product.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core'; // Importing OrderEntity from the appropriate directory

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: EntityRepository<Orders>,
    private readonly entityManager: EntityManager,
  ) {}
  async createOrder(createOrderDto: OrderDto): Promise<Orders> {
    const newOrder = await this.orderRepository.create(createOrderDto);
    await this.entityManager.persistAndFlush(newOrder);
    return newOrder;
  }

  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.findAll();
    return orders.map((order) => order.toJSON());
  }

  async removeOrder(id: number): Promise<boolean> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      return false;
    }
    await this.entityManager.removeAndFlush(order);
    return true;
  }

  async updateOrder(
    id: number,
    updateOrderDto: OrderDto,
  ): Promise<OrderDto | null> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      return null;
    }
    order.id = updateOrderDto.id;
    order.name = updateOrderDto.name;
    order.phone = updateOrderDto.phone;
    order.address = updateOrderDto.address;
    order.paymentType = updateOrderDto.paymentType;
    order.price = updateOrderDto.price;
    order.date = updateOrderDto.date;
    // order.products = updateOrderDto.products;

    await this.entityManager.persistAndFlush(order);
    return order.toJSON();
  }
}
