import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Icon } from '../models/icon';

@Injectable({ providedIn: 'root' })
export class UserService {
  icon: Icon;
  title: string;

  constructor(private httpClient: HttpClient) {
    this.iconSubject = new BehaviorSubject<Icon>(this.icon);
    this.titleSubject = new BehaviorSubject<string>(this.title);

    this.userIcon = this.iconSubject.asObservable();
    this.titleObservable = this.titleSubject.asObservable();
  }

  public userIcon: Observable<Icon>;
  public titleObservable: Observable<string>;
  private iconSubject: BehaviorSubject<Icon>;
  private titleSubject: BehaviorSubject<string>;

  getUserSubscription(userId: any) {
    return this.httpClient.get(
      `${environment.adUrl}/api/users/` + userId + '/subscription'
    );
  }

  getUserIcon(userId: any) {
    return this.httpClient.get(
      `${environment.adUrl}/api/users/` + userId + '/icon'
    );
  }

  setUserIcon(icon: any) {
    this.icon = icon;
    this.iconSubject.next(this.icon);
    // this.iconSubject = new BehaviorSubject<Icon>(icon.icon.url);

    // this.userIcon = this.iconSubject.asObservable();
  }

  setTitle(title: string) {
    this.title = title;
    this.titleSubject.next(this.title);
  }
}
