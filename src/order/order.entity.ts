import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { OrderDto } from './DTO/order.dto';
import { OrderRepository } from './order.repository';
import { Products } from '../product/product.entity';

@Entity({ repository: () => OrderRepository })
export class Orders {
  constructor(
    name: string,
    phone: string,
    address: string,
    paymentType: number,
    price: string,
  ) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.paymentType = paymentType;
    this.price = price;
  }
  @PrimaryKey()
  id!: number;

  @Property()
  name?: string;

  @Property()
  phone?: string;

  @Property()
  address?: string;

  @Property({
    fieldName: 'payment_type',
    columnType: 'smallint',
  })
  paymentType?: number;

  @Property({ columnType: 'numeric(100,2)' })
  price?: string;

  @Property()
  date: Date = new Date();

  @ManyToMany(() => Products, (product) => product.orders)
  products = new Collection<Products>(this);

  toJSON() {
    return wrap<Orders>(this).toObject() as unknown as OrderDto;
  }

  toStr() {
    const data = wrap<Orders>(this).toObject() as unknown as OrderDto;
    return JSON.stringify(data);
  }
}
