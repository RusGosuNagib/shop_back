import { ProductDto } from 'src/product/DTO/product.dto';
export class OrderDto {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly address: string;
  readonly paymentType: number;
  readonly price: string;
  readonly date: Date;
  readonly products: ProductDto[];
}
