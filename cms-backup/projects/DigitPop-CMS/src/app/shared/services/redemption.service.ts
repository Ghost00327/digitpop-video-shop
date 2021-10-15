import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Redemption } from '../models/redemption';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class RedemptionService {

    constructor(private http: HttpClient) { }

    requestRedemption(redemption: Redemption) {
        console.log('In requestRedemption');
        return this.http.post('/api/redemption/', redemption, httpOptions);
    }

}

