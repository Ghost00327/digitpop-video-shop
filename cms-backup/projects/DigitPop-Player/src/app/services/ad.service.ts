import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { ProductGroup } from '../models/productGroup';

@Injectable({ providedIn: 'root' })
export class AdService {
  constructor(private httpClient: HttpClient) {}

  getAd(videoId: any) {
    return this.httpClient.get(
      `${environment.adUrl}/api/projects/` + videoId + '/true'
    );
  }

  createView(adId: any, cycle: any) {
    return this.httpClient.post<any>(`${environment.adUrl}/api/views/`, {
      id: adId,
      cycle: cycle,
    });
  }

  increaseProjectViewCount(videoId: any) {
    return this.httpClient.put<any>(
      `${environment.adUrl}/api/projects/` + videoId + `/count/videowatch`,
      null
    );
  }

  increaseProductClickCount(product: Product) {
    return this.httpClient.put<any>(
      `${environment.adUrl}/api/products/` + product._id + `/count/click`,
      product
    );
  }

  increaseProductActionCount(product: Product) {
    return this.httpClient.put<any>(
      `${environment.adUrl}/api/products/` + product._id + `/count/buynowclick`,
      product
    );
  }

  increaseProductGroupPauseCount(productGroup: ProductGroup) {
    return this.httpClient.put<any>(
      `${environment.adUrl}/api/productGroups/` +
        productGroup._id +
        `/count/pause`,
      productGroup
    );
  }
}
