import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import {environment} from '../../../environments/environment';
import {Person} from "../../models/imdb/person";

@Injectable({
  providedIn: 'root'
})
export class ImdbPeopleService {
  private apiKeys = {
    v3: environment.imdb.apiKeys.v3,
    v4: environment.imdb.apiKeys.v4
  }

  private url = 'https://api.themoviedb.org/3/person';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKeys.v4}`,
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.error(`[Client/Network Error] ${error.error}`);
    } else {
      // Backend-side error (ie. error 404)
      console.error(`[Error ${error.status}] ${error.error}`);
    }

    // Return an error for custom front-end handling
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`, {headers: this.headers}).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }
}
