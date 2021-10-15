import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-redemptionpopup',
  templateUrl: './redemptionpopup.component.html',
  styleUrls: ['./redemptionpopup.component.css']
})

export class RedemptionpopupComponent implements OnInit {

  dialog2: MatDialog;

  constructor(private dialogRef: MatDialogRef<RedemptionpopupComponent>, public dialog: MatDialog) {
    this.dialog2 = dialog;
  }

  ngOnInit() {

  }

}
