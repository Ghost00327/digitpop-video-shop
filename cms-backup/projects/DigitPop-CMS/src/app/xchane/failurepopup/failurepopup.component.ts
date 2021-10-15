import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-failurepopup',
  templateUrl: './failurepopup.component.html',
  styleUrls: ['./failurepopup.component.css']
})

export class FailurepopupComponent implements OnInit {

  dialog2: MatDialog;

  constructor(private dialogRef: MatDialogRef<FailurepopupComponent>, public dialog: MatDialog) {
    this.dialog2 = dialog;
  }

  ngOnInit() {

  }

}
