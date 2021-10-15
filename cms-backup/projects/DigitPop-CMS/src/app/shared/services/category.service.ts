import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categoryList$: Observable<Object>;

  constructor(private httpClient: HttpClient) {}

  getCategories() {
    if (!this.categoryList$) {
      this.categoryList$ = this.httpClient
        .get(`${environment.apiUrl}/api/categories`)
        .pipe(shareReplay(1));
    }
    return this.categoryList$;
  }

}
