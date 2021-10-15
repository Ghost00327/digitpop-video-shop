import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  favIcon: HTMLLinkElement = document.querySelector('#appIcon');

  constructor(private userService: UserService, private titleService: Title) {
    this.userService.userIcon.subscribe((x) => this.setIcon(x));
    this.userService.titleObservable.subscribe((x) => this.setTitle(x));
  }

  setIcon(icon: any) {
    if (icon != null) {
      this.favIcon.href = icon.icon.url;
    }
  }

  public setTitle(newTitle: string) {
    if (newTitle != null) {
      this.titleService.setTitle(newTitle);
    }
  }

  // ngOnInit(): void {
  //   this.favIcon.href = 'https://www.google.com/favicon.ico';
  // }

  title = 'DigitPop-Player';
}
