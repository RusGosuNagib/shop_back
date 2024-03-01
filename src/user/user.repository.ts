import { EntityRepository } from '@mikro-orm/core';
import { Users } from './User.entity';
export class UserRepository extends EntityRepository<Users> {}
