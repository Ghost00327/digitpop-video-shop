import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  constructor(private httpClient: HttpClient) {}

  addCampaign(campaign: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/campaigns`, {
      campaign,
    });
  }

  updateCampaign(campaign: Campaign) {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/api/campaigns/` + campaign._id,
      {
        campaign,
      }
    );
  }

  /** GET Campaign Stats */
  getCampaignStats() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/campaigns/mycampaignStats`
    );
  }

  /** GET Campaign Stats */
  getMyCampaigns() {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/api/campaigns/mycampaigns`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

import { CanLoad, Route } from '@angular/router';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { Campaign } from '../models/campaign';

@Injectable({ providedIn: 'root' })
export class NameGuard implements CanLoad {
  constructor() {}

  canLoad(route: Route) {
    return true;
  }
}
