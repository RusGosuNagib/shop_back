import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Users {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  email?: string;

  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Property({ fieldName: 'returnSecureToken', nullable: true })
  returnSecureToken?: boolean;

  @Property({ fieldName: 'expiresIn', nullable: true })
  expiresIn?: number;

  @Property({ fieldName: 'idToken', nullable: true })
  idToken?: string;

  @Property({ fieldName: 'secureToken', nullable: true })
  secureToken?: string;

  @Property({ columnType: 'smallint' })
  role?: number;
}
