import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

import {environment} from '../../../environments/environment';
import {catchError, Observable, retry, throwError} from "rxjs";
import {Movie} from "../../models/imdb/movie";
import {Result} from "../../models/imdb/result";

@Injectable({
  providedIn: 'root'
})
export class ImdbMovieService {
  private apiKeys = {
    v3: environment.imdb.apiKeys.v3,
    v4: environment.imdb.apiKeys.v4
  }

  private url = 'https://api.themoviedb.org/3/movie';
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

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`, {headers: this.headers,}).pipe(
      retry(3), // Retry the request 3 times
      catchError(this.handleError),
    );
  }

  getTopRatedMovies(page: number = 1): Observable<Result<Movie>> {
    return this.http.get<Result<Movie>>(`${this.url}/top_rated`, {headers: this.headers, params: {page,}}).pipe(
      retry(3),
      catchError(this.handleError),
    );
  }
}
