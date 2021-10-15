import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import {
  map,
  // publishReplay,
  // refCount,
  catchError,
  shareReplay
} from 'rxjs/operators'
import { Project } from '../models/project'
import { environment } from 'projects/DigitPop-CMS/src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceTwo {
  projects$: Observable<Project[]>

  constructor(private http: HttpClient) {
  }

  getProjects(): void {
    this.projects$ = this.http.get<Project[]>(`${environment.apiUrl}/api/projects`).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(error => throwError(error))
    ) as Observable<Project[]>
  }
}
