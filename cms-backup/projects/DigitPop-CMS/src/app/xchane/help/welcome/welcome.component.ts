import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Project } from '../../../shared/models/project';

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


}
