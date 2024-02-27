import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
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

  @Property({ columnType: 'date' })
  date?: string;
}
