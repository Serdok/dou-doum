import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import {environment} from '../../../environments/environment';
import {Result} from "../../models/imdb/result";
import {Movie} from "../../models/imdb/movie";

@Injectable({
  providedIn: 'root'
})
export class ImdbSearchService {
  private apiKeys = {
    v3: environment.imdb.apiKeys.v3,
    v4: environment.imdb.apiKeys.v4
  }

  private url = 'https://api.themoviedb.org/3/search';
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

  searchMovie(query: string, page: number = 1, include_adult: boolean = true): Observable<Result<Movie>> {
    return this.http.get<Result<Movie>>(`${this.url}/movie`, {
      headers: this.headers,
      params: new HttpParams().set('query', query).set('page', page).set('include_adult', include_adult),
    }).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }
}
