import {
  Collection,
  Entity, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
// import { Products } from '../product/product.entity';
import { OrderDto } from './DTO/order.dto';
import { OrderRepository } from './order.repository';
import { Products } from '../product/product.entity';
import { ProductDto } from '../product/DTO/product.dto';

@Entity({ repository: () => OrderRepository })
export class Orders {
  constructor(
    name: string,
    phone: string,
    address: string,
    paymentType: number,
    price: string,
    // products: Products[],
  ) {
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.paymentType = paymentType;
    this.price = price;
    // this.products = products;
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
    fieldName: 'paymentType',
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
