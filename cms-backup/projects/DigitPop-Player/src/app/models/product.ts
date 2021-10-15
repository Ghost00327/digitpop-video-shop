export class Product {
  _id: string;
  name: string;
  description: string;
  subtitle: string;
  makeThisYourLookURL: string;
  price: string;
  images: Array<ProductImage>;

  constructor() {
    this.images = new Array<ProductImage>();
  }
}

export class ProductImage {

  constructor(body:any) {
    this.url = body.url;
    this.original_filename = body.original_filename;
    this.public_id = body.public_id;
    this.secure_url = body.secure_url;
    this.signature = body.signature;
  }

  url: string;
  original_filename: string;
  public_id: string;
  secure_url: string;
  signature: string;
}
