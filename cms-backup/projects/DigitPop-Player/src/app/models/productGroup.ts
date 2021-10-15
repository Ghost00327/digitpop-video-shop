import { Product } from './product';

export class ProductGroup {
  _id: string;
  title: string;
  description: string;
  subtitle: string;
  thumbnail: any;
  time: any;

  products: Array<Product>;

  constructor(product?: Product) {
    this.title = 'placeholder';
    this.subtitle = 'placeholder';
    this.description = 'placeholder';
    this.time = 0;
    this.products = new Array<Product>();

    if (product != null) {
      this.products.push(product);
    }
  }
}

