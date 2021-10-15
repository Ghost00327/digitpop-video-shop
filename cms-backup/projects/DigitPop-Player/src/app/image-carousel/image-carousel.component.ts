import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  url:any;
  width:any;
  height:any;

  constructor(public dialogRef: MatDialogRef<ImageCarouselComponent>) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  ngOnInit(): void {
  }

}
