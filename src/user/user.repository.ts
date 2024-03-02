import { EntityRepository } from '@mikro-orm/core';
import { Users } from './user.entity';
export class UserRepository extends EntityRepository<Users> {}
