import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id: number;

  @Property()
  type: string;

  @Property()
  title: string;

  @Property()
  photo: string;

  @Property()
  info: string;

  @Property()
  price: string;

  @Property()
  date: string;

  @Property()
  product: object;
}
