import { Migration } from '@mikro-orm/migrations';

export class Migration20240302233337 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "orders" ("id" serial primary key, "name" varchar(255) null, "phone" varchar(255) null, "address" varchar(255) null, "payment_type" smallint null, "price" numeric(100,2) null, "date" timestamptz not null);');

    this.addSql('create table "products" ("id" serial primary key, "title" varchar(255) null, "type" smallint null, "photo" text null, "info" text null, "price" numeric(7,2) null, "date" timestamptz not null);');

    this.addSql('create table "products_orders" ("products_id" int not null, "orders_id" int not null, constraint "products_orders_pkey" primary key ("products_id", "orders_id"));');

    this.addSql('create table "users" ("id" serial primary key, "email" varchar(255) null, "password" text null, "expires_in" int null, "secure_token" varchar(255) null, "role" smallint null default 0, "secure_token_exp_date" timestamptz null);');

    this.addSql('alter table "products_orders" add constraint "products_orders_products_id_foreign" foreign key ("products_id") references "products" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "products_orders" add constraint "products_orders_orders_id_foreign" foreign key ("orders_id") references "orders" ("id") on update cascade on delete cascade;');
  }

}
