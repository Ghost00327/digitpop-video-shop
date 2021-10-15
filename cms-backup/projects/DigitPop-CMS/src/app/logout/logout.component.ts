import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../shared/services/auth-service.service';
import { BillsbyService } from '../shared/services/billsby.service';

@Component({
  selector: 'DigitPop-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    public router:Router
  ) {
  }
  ngOnInit(){

  }
  logout(){
    localStorage.removeItem("currentuser");
    localStorage.removeItem("currentrole");
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }
  // convenience getter for easy access to form fields
}
