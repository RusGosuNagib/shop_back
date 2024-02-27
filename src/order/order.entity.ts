import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
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

  @Property({ columnType: 'date' })
  date?: string;

  @Property()
  products?: string[];
}
