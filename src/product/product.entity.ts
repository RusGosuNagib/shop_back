import {
  Collection,
  Entity, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { ProductRepository } from './product.repository';
import { ProductDto } from './DTO/product.dto';
import { OrderDto } from '../order/DTO/order.dto';
import { Orders } from '../order/order.entity';

@Entity({ repository: () => ProductRepository })
export class Products {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  title?: string;

  @Property({ columnType: 'smallint' })
  type?: number;

  @Property({ columnType: 'text', nullable: true })
  photo?: string;

  @Property({ columnType: 'text', nullable: true })
  info?: string;

  @Property({ columnType: 'numeric(7,2)' })
  price?: string;

  @Property()
  date: Date = new Date();

  @ManyToMany({
    hidden: true,
  })
  orders = new Collection<Orders>(this);

  constructor(
    title: string,
    type: number,
    photo: string,
    info: string,
    price: string,
  ) {
    this.title = title;
    this.type = type;
    this.photo = photo;
    this.info = info;
    this.price = price;
  }

  toJSON() {
    return wrap<Products>(this).toObject() as ProductDto;
  }
}
