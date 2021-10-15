import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { XchaneUser } from '../models/xchane.user';
import { environment } from 'projects/DigitPop-CMS/src/environments/environment';
import { HTTP_NOBILLS } from '../../cms/cms.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' } ),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(@Inject(HTTP_NOBILLS) private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentuser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  welcome() {
    return this.http.put<any>(
      `${environment.apiUrl}/api/users/` +
        this.currentUserValue._id +
        '/welcome',
      { id: this.currentUserValue._id }
    );
  }

  login(email: string, password: string) {
    console.log("user:",email,password);
    return this.http
      .post<any>(`${environment.apiUrl}/auth/local`, { email, password })
      .pipe(
        map((res) => {
          // login successful if there's a jwt token in the response
          console.log('LOGIN RESULT : ' + JSON.stringify(res));
          if (res.token) {
            res.user.token = res.token;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(res.user));
            // localStorage.setItem("currentuser",res.user.email);
            // localStorage.setItem("currentrole",res.user.role);
            this.currentUserSubject.next(res.user);
          } else {
            alert(res.message);
          }
          return res.user;
        }),
        catchError((err, caught) => {
          console.log(err)
          return err;
        })
      )
  }

  storeUser(user: any) {
    localStorage.setItem('currentuser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  updateUser(user: User) {
    return this.http.put<any>(`${environment.apiUrl}/api/users/` + user._id, {
      user,
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUsage(user: User, cycle: any) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/users/` + user._id + '/' + cycle + '/usage'
    );
  }

  createUser(user: User) {

    var name = user.name;
    var email= user.email;
    var password = user.password;
    var role = user.role;
    let body = JSON.stringify(user);
    // var sid = user.sid;
    // var cid = user.cid;
    // console.log(user);
    return this.http
      .post<any>(`${environment.apiUrl}/api/users/`, {name,email, password, role})
      .pipe(
        map((res) => {
          console.log(res);
          // login successful if there's a jwt token in the response
          // if (res.user && res.token) {
          //   console.log('Successful signup');
          //   localStorage.setItem("currentuser",res.user.email);
          //   localStorage.setItem("currentrole",res.user.role);
                      // res.user.token = res.token;
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      // localStorage.setItem('currentuser', JSON.stringify(res.user));
          //   this.currentUserSubject.next(res.user);
          // }

          return res;
        })
      );

    // return this.http.post<any>(`${environment.apiUrl}/api/users/`, {
    //   packet,
    // });
  }


}
