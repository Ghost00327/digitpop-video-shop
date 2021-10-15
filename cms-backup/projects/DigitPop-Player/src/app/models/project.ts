import { ProductGroup } from './productGroup';
import { Category } from './category';

export class Project {

  _id: string;
  name: string;
  productGroupTimeLine: Array<ProductGroup>;
  category: Category;
  description: string;
  media: any;
  thumbnail: any;
  createdBy: any;
  active: boolean;

  constructor() {
    this.productGroupTimeLine = new Array<ProductGroup>();
  }
}
