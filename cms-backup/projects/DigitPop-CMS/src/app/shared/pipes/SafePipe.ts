import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url:any) {
    var test = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return test;
  }
}
