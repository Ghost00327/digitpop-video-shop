import { throwError as observableThrowError, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { XchaneUser } from '../../shared/models/xchane.user';
import { XchaneAuthenticationService } from '../../shared/services/xchane-auth-service.service';
import { AuthenticationService } from '../../shared/services/auth-service.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  users: Array<XchaneUser>;
  selectedUser: XchaneUser;

  constructor(public authService: XchaneAuthenticationService, public route: ActivatedRoute,
    public router: Router) {
    console.log('admin constructor');

    this.authService.getAllXchaneUsers().subscribe(
      data => {
        this.users = data as Array<XchaneUser>;
        console.log('In AdminComponent get all users callback.  Users list is  : ' + this.users);
      },
      error => {
        console.log('Call to get all users failed with error : ' + error);
        return observableThrowError(error);
      }
    );
  }

  public onChange(event: { target: { value: any; }; }): void {  // event will give you full breif of action
    var newVal = event.target.value;
    console.log(newVal);

    this.authService.getXchaneUser(newVal).subscribe(
      data => {
        this.selectedUser = data as XchaneUser;
        console.log('Selected User Email ' + this.selectedUser.email);
      },
      error => {
        console.log('Call to get all users failed with error : ' + error);
        return observableThrowError(error);
      }
    );
    //this.selectedUser = newVal as XchaneUser;
    //console.log("Selected User : " + this.selectedUser.email);
  }

  public setSelectedUser(xchaneUser: XchaneUser) {
    console.log("In setSelectedUser");

    for (var name in xchaneUser) {
      alert(name);
    }

    this.selectedUser = xchaneUser as XchaneUser;
  }

  public onApproveUser() {
    this.selectedUser.approved = true;
    this.authService.approveXchaneUser(this.selectedUser).subscribe(
      data => {
        alert('User Approved');
        console.log('In AdminComponent approve user callback.');
      },
      error => {
        console.log('Call to get all users failed with error : ' + error);
        return observableThrowError(error);
      }
    );
  }
}



@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate() {
    return false;
    // console.log("In canActivate.  Current user role is : " + this.authService.currentUser.role);
    // return this.authService.currentUser.role === 'admin';
  }


}
