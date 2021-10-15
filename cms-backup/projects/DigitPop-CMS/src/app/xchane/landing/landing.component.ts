
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { User } from '../../shared/models/user';
import { XchaneUser } from '../../shared/models/xchane.user';
import { XchaneAuthenticationService } from '../../shared/services/xchane-auth-service.service';
import { Token } from '../../shared/models/token';
import { ThemePalette } from '@angular/material/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {

  public advertisingUser: User;
  user = {} as XchaneUser;
  currentUser = {} as XchaneUser;
  public loginUser: XchaneUser;
  color: ThemePalette = 'primary';

  constructor(public authService: XchaneAuthenticationService, public route: ActivatedRoute,
    public router: Router, public dialog: MatDialog,) {
    console.log('landing component constructor');
    this.user = new XchaneUser();
    this.currentUser = new XchaneUser();
    this.loginUser = new XchaneUser();
    this.advertisingUser = new User();
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngOnInit() {
	// Load component custom script
	this.loadScript('../../assets/js/app.landing.scripts.js');
  }

  title = 'app';

  // DigitPop User Password Verification
  password2 = '';
  // Advertising User Password Verification
  password3 = '';

  // Show Flags
  showAlert = false;
  showUserCreated = false;
  showUserCreationFailed = false;

  loginPassword: string;
  loginEmail: string;
  referralCode: string;

  clearAlert () {
    this.showAlert = false;
  }

  onSubmit() {
    console.log('In submit!');
    this.createXchaneUser(this.user);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '40%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '40%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }

  onLogin() {
    console.log('In login!');
    const loginUserObj = new XchaneUser();
    //console.log('loginEmail is : ' + this.loginEmail);
    //console.log('loginPassword is : ' + this.loginPassword);

    loginUserObj.email = this.loginEmail;
    loginUserObj.password = this.loginPassword;
    //console.log('In onLogin, loginUserObj is :' + JSON.stringify(loginUserObj));
    //console.log('In onLogin, loginUser is :' + JSON.stringify(this.loginUser));
    this.loginXchaneUser(loginUserObj);
  }

  loginXchaneUser(userObj: XchaneUser) {
    //console.log('In loginXchaneUser, user is :' + JSON.stringify(userObj));
    //console.log('In loginXchaneUser, user email is : ' + userObj.email);
    //console.log('In loginXchaneUser, user password is : ' + userObj.password);

    this.authService.loginXchaneUser(userObj.email, userObj.password).subscribe(
      data => {
        let tkn = new Token();
        tkn = data as Token;

        //console.log('tkn as string :' + JSON.stringify(tkn));
        localStorage.setItem('id_token', tkn.token);

        this.authService.getCurrentXchaneUser().subscribe(
          data2 => {
            let use = new XchaneUser;
            use = data2 as XchaneUser;
            this.authService.storeUser(use);
            this.router.navigate(['/dashboard']);
          });

        // refresh the list
        //console.log('User logged in :' + this.currentUser);
        return true;
      },
      error => {
        console.error('Error logging in user!');
        this.showAlert = true;
        return observableThrowError(error);
      }
    );
  }

  createXchaneUser(user: XchaneUser) {

    this.authService.createXchaneUser(this.user).subscribe(
      data => {

        this.showUserCreated = true;
        this.currentUser = user;
        this.authService.storeUser(this.currentUser);
        return true;
      },
      error => {
        this.showUserCreationFailed = true;
        console.error('Error saving user!');
        return observableThrowError(error);
      }
    );
  }


}
