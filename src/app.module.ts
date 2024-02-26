import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
