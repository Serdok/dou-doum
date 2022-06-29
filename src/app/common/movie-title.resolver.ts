import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable} from 'rxjs';
import {ImdbMovieService} from "../services/imdb/imdb-movie.service";

@Injectable({
  providedIn: 'root'
})
export class MovieTitleResolver implements Resolve<string> {
  constructor(private imdbMovie: ImdbMovieService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const id = parseInt(route.paramMap.get('id')!);
    return this.imdbMovie.getMovie(id).pipe(
      map(movie => `Movie - ${movie.title}`),
    );
  }
}
