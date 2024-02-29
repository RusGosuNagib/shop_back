import { EntityRepository } from '@mikro-orm/core';
import { Products } from './product.entity';
export class ProductRepository extends EntityRepository<Products> {}
