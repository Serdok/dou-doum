import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import {environment} from '../../../environments/environment';
import {Image} from "../../models/imdb/image";

@Injectable({
  providedIn: 'root'
})
export class ImdbImageService {
  private apiKeys = {
    v3: environment.imdb.apiKeys.v3,
    v4: environment.imdb.apiKeys.v4
  }

  private url = '';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKeys.v4}`,
      'Content-Type': 'application/json',
    });
  }

  set base_url(base_url: string) {
    this.url = base_url;
  }

  getImageUrl(size: string, file: string): string {
    return `${this.url}/${size}/${file}`;
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

  getImage(size: string, file: string): Observable<Image> {
    return this.http.get<Image>(`${this.url}/${size}/${file}`, {headers: this.headers}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
}
