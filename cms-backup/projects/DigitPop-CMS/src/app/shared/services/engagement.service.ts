import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { XchaneUser } from '../models/xchane.user';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class EngagementService {
  constructor(private http: HttpClient) {}

  createEngagement(xchaneUser: XchaneUser, category: Category) {
    var x = `${environment.apiUrl}`;
    console.log(x);

    return this.http.post<any>(
      `${environment.apiUrl}/api/engagement/`,
      { xchaneUser, category },
      httpOptions
    );

    //return this.http.post('/api/engagement/', xchaneUser, httpOptions);
  }

  getEngagement(engagementId: string) {
    return this.http.get('/api/engagement/' + engagementId);
  }
}
