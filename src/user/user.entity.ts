import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class Users {
  constructor(
    email: string,
    password: string,
    role: number,
    expiresIn: number,
    secureToken: string,
    secureTokenExpDate: string,
  ) {
    this.email = email;
    this.password = password;
    this.role = 0;
    this.expiresIn = expiresIn;
    this.secureToken = secureToken;
    this.secureTokenExpDate = new Date(Date.now() + expiresIn * 1000);
  }

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  email?: string;

  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Property({ fieldName: 'expires_in', nullable: true })
  expiresIn?: number;

  @Property({ fieldName: 'secure_token', nullable: true })
  secureToken?: string;

  @Property({ columnType: 'smallint' })
  role?: number;

  @Property({ fieldName: 'secure_token_exp_date', nullable: true })
  secureTokenExpDate?: Date;
}
