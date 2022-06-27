import { Component, OnInit } from '@angular/core';
import {ImdbMovieService} from "../../../services/imdb/imdb-movie.service";
import {Movie} from "../../../models/imdb/movie";
import {Result} from "../../../models/imdb/result";
import {mergeMap, Observable, tap, zipAll} from "rxjs";
import {ImdbService} from "../../../services/imdb/imdb.service";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.sass']
})
export class TopMoviesComponent implements OnInit {
  result$: Observable<Result<Movie>> | null = null;
  movies$: Observable<Movie[]> | null = null;
  first: number = 0;

  faRankingStar = faRankingStar;

  constructor(private imdb: ImdbService, public imdbImage: ImdbImageService, private imdbMovie: ImdbMovieService) {}

  ngOnInit(): void {
    this.first = 0;
    this.refreshData();

    this.imdb.getConfiguration().subscribe(config => {
      console.log(config);
      this.imdbImage.base_url = config.images.secure_base_url;
    });
  }

  paginate(event: any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.first = event.first;
    this.refreshData(event.page + 1);
  }

  refreshData(page: number = 1) {
    this.result$ = this.imdbMovie.getTopRatedMovies(page);
    this.movies$ = this.result$.pipe(
      mergeMap(result => {
        return result.results.map(movie => this.imdbMovie.getMovie(movie.id));
      }),
      zipAll(),
      tap(console.log)
    );
  }
}
