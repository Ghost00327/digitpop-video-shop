import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from './shared/models/user';
import { SpinnerService } from './shared/services/spinner.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './xchane/signup/signup.component';
@Component({
  selector: 'DigitPop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  email: any;
  password: any;
  dialogRef: any;
  // currentUser: User;
  showSpinner: boolean;
  currentUser:any;
  currentRole:any;
  isNotLandingpage: any;
  @ViewChild(HomeComponent) child:HomeComponent;
  constructor(
    public spinnerService: SpinnerService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private router: Router
  ) {
    // this.authenticationService.currentUser.subscribe(
    //   (x) => (this.currentUser = x)
    // );
  }
  ngOnInit(){
    this.currentRole= localStorage.getItem("currentrole");
    if(this.currentRole=="admin"||this.currentRole=="Business"){
      this.router.navigate(['/cms/dashboard']);
    };
    if(this.currentRole=="consumer"){
      this.router.navigate(['/xchane/dashboard']);
    };
  }
  ngDoCheck(){
    this.isNotLandingpage = true
    this.currentUser= localStorage.getItem("currentuser");
    this.currentRole= localStorage.getItem("currentrole");
    
    if (this.router.url == "/") {
      this.isNotLandingpage = false
    } 


    // if(this.currentRole=="admin"||this.currentRole=="Business"){
    //   this.router.navigate(['/cms/dashboard']);
    // };
    // if(this.currentRole=="consumer"){
    //   this.router.navigate(['/xchane/dashboard']);
    // };
    // console.log(this.currentUser);

  }
  openLoginDialog(): void {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }
  openSignup(): void {

    const dialogRef = this.dialog.open(SignupComponent, {
      width: '40%',
      height: '70%'
    });
   
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    });
  }
  openLogout():void{
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '400px',
      height: '150px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
    // localStorage.removeItem("currentuser");
    // localStorage.removeItem("currentrole");
    // this.router.navigate(['/']);
  }

  openDialog(): void {
    console.log("WZZZAAA");
    this.router.navigate(['/xchane/landing']);

    // const dialogRef = this.dialog.open(LoginComponent, {
    //   width: '250px',
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('The dialog was closed');
    // });
  }

  ngAfterContentInit(): void {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }

  account() {
    //this.router.navigate(['/account']);

    this.router.navigate(['/xchane/landing']);
  }
}
