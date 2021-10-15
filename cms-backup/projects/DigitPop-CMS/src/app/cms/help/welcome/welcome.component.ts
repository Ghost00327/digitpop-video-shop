import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Project } from '../../../shared/models/project';
import { PreviewComponent } from '../../preview/preview.component';

@Component({
  selector: 'DigitPop-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  project:Project;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  preview() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: "5aaad85b76f2c80400431c3c",
    };

    const dialogRef = this.dialog.open(PreviewComponent, dialogConfig);
  }

}
