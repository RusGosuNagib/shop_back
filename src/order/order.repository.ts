import { EntityRepository } from '@mikro-orm/core';
import { Orders } from './order.entity';
export class OrderRepository extends EntityRepository<Orders> {}
