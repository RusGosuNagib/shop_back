import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Orders } from './order.entity';
import { Products } from '../product/product.entity';

@Module({
  controllers: [OrderController],
  imports: [MikroOrmModule.forFeature({ entities: [Orders, Products] })],
  providers: [OrderService],
})
export class OrderModule {}
