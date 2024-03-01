import { Migration } from '@mikro-orm/migrations';

export class Migration20240301080637 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "orders" ("id" serial primary key, "name" varchar(255) null, "phone" varchar(255) null, "address" varchar(255) null, "paymentType" smallint null, "price" numeric(100,2) null, "date" timestamptz not null);');

    this.addSql('create table "products" ("id" serial primary key, "title" varchar(255) null, "type" smallint null, "photo" text null, "info" text null, "price" numeric(7,2) null, "date" timestamptz not null, "orders_id" int not null);');

    this.addSql('create table "users" ("id" serial primary key, "email" varchar(255) null, "password" text null, "returnSecureToken" boolean null, "expiresIn" int null, "idToken" varchar(255) null, "secureToken" varchar(255) null, "role" smallint null);');

    this.addSql('alter table "products" add constraint "products_orders_id_foreign" foreign key ("orders_id") references "orders" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "products" drop constraint "products_orders_id_foreign";');

    this.addSql('drop table if exists "orders" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
