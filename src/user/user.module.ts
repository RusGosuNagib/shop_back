import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Products } from '../product/product.entity';
import { Orders } from '../order/order.entity';
import { Users } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [MikroOrmModule.forFeature({ entities: [Products, Orders, Users] })],
  providers: [UserService],
})
export class UserModule {}
