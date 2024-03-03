import { Injectable } from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { Orders } from './order.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Products } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: EntityRepository<Orders>,
    @InjectRepository(Products)
    private readonly productRepository: EntityRepository<Products>,
    private readonly entityManager: EntityManager,
  ) {}

  async createOrder(createOrderDto: OrderDto): Promise<boolean> {
    const products: Products[] = await this.productRepository.find({
      id: {
        $in: createOrderDto.products.map((product: Products) => product.id),
      },
    });

    if (!products) {
      return false;
    }
    const order = new Orders(
      createOrderDto.name,
      createOrderDto.phone,
      createOrderDto.address,
      createOrderDto.paymentType,
      createOrderDto.price,
    );
    order.products.add(products);
    await this.entityManager.persistAndFlush(order);
    return true;
  }
  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderRepository.findAll({
      populate: ['products'],
    });
    if (!orders) return [];
    return orders.map((order) => order.toJSON());
  }

  async removeOrder(id: number): Promise<boolean> {
    console.log('[p[p[p[p[p[p[p[p]', id);
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
  ): Promise<OrderDto | boolean> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      return false;
    }
    order.id = updateOrderDto.id;
    order.name = updateOrderDto.name;
    order.phone = updateOrderDto.phone;
    order.address = updateOrderDto.address;
    order.paymentType = updateOrderDto.paymentType;
    order.price = updateOrderDto.price;
    order.date = updateOrderDto.date;

    await this.entityManager.persistAndFlush(order);
    return order.toJSON();
  }
}
