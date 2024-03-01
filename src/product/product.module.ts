import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Products } from './product.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Orders } from '../order/order.entity';

@Module({
  controllers: [ProductController],
  imports: [MikroOrmModule.forFeature({ entities: [Products, Orders] })],
  providers: [ProductService],
})
export class ProductModule {}
