import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Product } from '../models/product';
import * as _ from 'lodash';
import { ProductGroup } from '../models/productGroup';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  createProduct(project: Project, productGroup:ProductGroup, product: Product) {
    var temp = { projectId: project._id };
    var temp2 = { productGroupId: productGroup._id };
    var body = _.assign(product, temp);
    var body2 = _.assign(body, temp2);

    return this.httpClient.post<any>(
      `${environment.apiUrl}/api/products/`,
      body2
    );
  }

  updateProduct(product: Product) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/api/products/` + product._id,
      product
    );
  }

  updateProductImages(product: Product) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/api/products/` + product._id + '/update/images',
      product
    );
  }


}
