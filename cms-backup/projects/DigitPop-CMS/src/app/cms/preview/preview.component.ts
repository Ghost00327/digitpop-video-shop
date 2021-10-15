import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { SafePipe } from '../../shared/pipes/SafePipe';

@Component({
  selector: 'DigitPop-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  iFrameSrc: any;

  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) _data: any
  ) {
    console.log(`${environment.playerUrl}/ad/`);
    var source = `${environment.playerUrl}/ad/` + _data.id + '/preview/true';
    console.log("Preview URL : " + source);
    this.iFrameSrc = source;

  }

  ngOnInit(): void {


  }
}
