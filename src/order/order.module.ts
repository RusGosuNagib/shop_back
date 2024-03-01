import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Orders } from './order.entity';
import { Products } from '../product/product.entity';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [OrderController],
  imports: [MikroOrmModule.forFeature({ entities: [Orders, Products] })],
  providers: [OrderService, ProductService],
})
export class OrderModule {}
