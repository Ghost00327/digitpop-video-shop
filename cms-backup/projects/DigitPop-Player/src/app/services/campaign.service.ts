import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  constructor(private httpClient: HttpClient) {}

  getCampaign(campaignId: any) {
    return this.httpClient.get(
      `${environment.adUrl}/api/campaigns/` + campaignId + '/true'
    );
  }

  verificationAnswer(answer: any)
  {
    return this.httpClient.post<any>(`${environment.adUrl}/api/engagements/answer`, {
      answer
    });

  }
}
