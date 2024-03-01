import { Injectable } from '@nestjs/common';
import { OrderDto } from './DTO/order.dto';
import { Orders } from './order.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
// import { Products } from '../product/product.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Products } from '../product/product.entity';
import { ProductDto } from '../product/DTO/product.dto'; // Importing OrderEntity from the appropriate directory

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: EntityRepository<Orders>,
    @InjectRepository(Products)
    private readonly productRepository: EntityRepository<Products>,
    private readonly entityManager: EntityManager,
  ) {}
  // async createOrder(createOrderDto: OrderDto): Promise<void> {
  //   console.log(createOrderDto);
  //   const products = await this.productRepository.find(createOrderDto.products);
  //   if (!products) {
  //     throw new Error('Products not found');
  //   }
  //   const p = products.map((product) => product.toJSON());
  //   console.log(p);
  //   const order = await this.entityManager.persistAndFlush({
  //     ...createOrderDto,
  //     products,
  //   }); // Persisting the order
  //   return order;
  // }
  async createOrder(createOrderDto: OrderDto): Promise<void> {
    // const products: Products[] = await this.productRepository.find({
    //   id: {
    //     $in: createOrderDto.products.map((product: Products) => product.id),
    //   },
    // });
    const products = await this.productRepository.findAll();

    if (!products) {
      throw new Error('Products not found');
    }
    const prods = products.map((product) => product.toJSON());
    const p2: ProductDto[] = [
      {
        "title": "Обувь",
        "type": +"3",
        "photo": "hoto",
        "info": "<p><sdfsfdsdf",
        "price": "5000.00",
        "id": +'2',
      }
    ]
    const order = new Orders(
      createOrderDto.name,
      createOrderDto.phone,
      createOrderDto.address,
      createOrderDto.paymentType,
      createOrderDto.price,
      p2,
    );
console.log(p2)
    return await this.entityManager.persistAndFlush(order);
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
