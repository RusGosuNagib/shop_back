import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Products } from './product.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  controllers: [ProductController],
  imports: [MikroOrmModule.forFeature({ entities: [Products] })],
  providers: [ProductService],
})
export class ProductModule {}
