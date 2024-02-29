import { Entity, ManyToOne, PrimaryKey, Property, wrap } from '@mikro-orm/core';
// import { Products } from '../product/product.entity';
import { OrderDto } from './DTO/order.dto';
import { OrderRepository } from './order.repository';
import { Products } from '../product/product.entity';

@Entity({ repository: () => OrderRepository })
export class Orders {
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

  @ManyToOne()
  products: Products[];

  toJSON() {
    return wrap<Orders>(this).toObject() as OrderDto;
  }
}
