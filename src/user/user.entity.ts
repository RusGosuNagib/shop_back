import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Users {
  constructor(
    email: string,
    password: string,
    role: number,
    expiresIn: number,
    secureToken: string,
  ) {
    this.email = email;
    this.password = password;
    this.expiresIn = expiresIn;
    this.secureToken = secureToken;
    this.role = 0;
  }

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  email?: string;

  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Property({ fieldName: 'expiresIn', nullable: true })
  expiresIn?: number;

  @Property({ fieldName: 'secureToken', nullable: true })
  secureToken?: string;

  @Property({ columnType: 'smallint' })
  role?: number;
}
