import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from '../../shared/services/campaign.service';
import { ProjectService } from '../../shared/services/project.service';


@Component({
  selector: 'DigitPop-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  displayedColumns: string[] = ['name','budgetAmount','active', 'impressionCount', 'engagementCount', 'pauseCount', 'buyNowCount', 'salesCount'];
  dataSource:any;

  constructor(private campaignService: CampaignService, private projectService: ProjectService,) {
  }

  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.campaignService.getMyCampaigns()
      .subscribe((campaigns: any[]) => {

        this.dataSource = new MatTableDataSource(campaigns);
        this.dataSource.sortingDataAccessor = (item:any, property:any) => {

          switch(property) {
            case 'impressionCount': return item.stats.impressionCount;
            case 'engagementCount': return item.stats.engagementCount;
            case 'pauseCount': return item.stats.pauseCount;
            case 'buyNowCount': return item.stats.buyNowCount;
            case 'salesCount': return item.stats.salesCount;

            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
      });
  }

}
