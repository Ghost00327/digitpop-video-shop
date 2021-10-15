import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { XchaneAuthenticationService } from '../../shared/services/xchane-auth-service.service';
import { ConfirmedValidator } from '../../shared/helpers/confirmed.validator';
import { XchaneUser } from '../../shared/models/xchane.user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'DigitPop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: XchaneAuthenticationService
  ) {
    this.loginForm = fb.group(
      {
        email: ['', Validators.required],
        password: ['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .loginXchaneUser(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log('LOGIN RESULT : ' + res);

          this.dialogRef.close();

          this.router.navigate(['/xchane/dashboard']);

          //this.router.navigate([this.returnUrl]);
        },
        (error) => {
          //this.error = error;
          //this.loading = false;
        }
      );
  }


  // submit() {
  //   var user = new XchaneUser();
  //   user.email = this.loginForm.controls['email'].value;
  //   user.password = this.loginForm.controls['password'].value;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.authService.loginXchaneUser(user).subscribe(
  //     () => {
  //       this.router.navigate(['/xchane/dashboard']);
  //       //this.router.navigate(['/dashboard']);
  //     },
  //     (err) => {
  //       console.log('Update error : ' + err.toString());
  //     }
  //   );
  // }
}
