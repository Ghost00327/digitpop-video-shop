import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';

@Component({
  selector: 'DigitPop-preview',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  iFrameSrc: any;

  constructor(
    public dialogRef: MatDialogRef<PlayerComponent>,
    @Inject(MAT_DIALOG_DATA) _data: any
  ) {
    // PASS IN CAMPAIGN AND ENGAGEMENT
    // var source = `${environment.playerUrl}/ad/` + _data.id + '/preview/true';
    // console.log("Preview URL : " + source);
    // this.iFrameSrc = source;

    //this.iFrameSrc = "http://localhost:4201/ad/5c1a0d3d71872d0004bba7d7";

    //this.iFrameSrc = "https://stvplayer.herokuapp.com/#!/ad/5c1a0d3d71872d0004bba7d7/engagement/5f41a5098bda620017622779/campaign/5c1b0394e2ce7000047cab0a";
  }

  ngOnInit(): void {


  }
}
