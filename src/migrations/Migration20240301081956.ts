import { Migration } from '@mikro-orm/migrations';

export class Migration20240301081956 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "products_orders" ("products_id" int not null, "orders_id" int not null, constraint "products_orders_pkey" primary key ("products_id", "orders_id"));');

    this.addSql('alter table "products_orders" add constraint "products_orders_products_id_foreign" foreign key ("products_id") references "products" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "products_orders" add constraint "products_orders_orders_id_foreign" foreign key ("orders_id") references "orders" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "products" drop constraint "products_orders_id_foreign";');

    this.addSql('alter table "products" drop column "orders_id";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "products_orders" cascade;');

    this.addSql('alter table "products" add column "orders_id" int not null;');
    this.addSql('alter table "products" add constraint "products_orders_id_foreign" foreign key ("orders_id") references "orders" ("id") on update cascade;');
  }

}
