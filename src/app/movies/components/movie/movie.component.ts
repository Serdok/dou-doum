import {Component, OnInit} from '@angular/core';
import {ImdbMovieService} from "../../../services/imdb/imdb-movie.service";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {Movie} from "../../../models/imdb/movie";
import {ActivatedRoute, Router} from "@angular/router";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";
import {ImdbService} from "../../../services/imdb/imdb.service";
import {Credits} from "../../../models/imdb/credits";
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {Keywords} from "../../../models/imdb/keywords";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  movie$!: Observable<Movie>;
  movieId!: number;

  userScore!: any;

  credits$!: Observable<Credits>;
  keywords$!: Observable<Keywords>;

  error!: any;

  runtimeHours!: number;
  runtimeMinutes!: number;

  intl = new Intl.DisplayNames(['en'], {type: 'language',});

  faCircleExclamation = faCircleExclamation;

  constructor(private imdb: ImdbService, private imdbMovie: ImdbMovieService, public imdbImage: ImdbImageService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.imdb.getConfiguration().subscribe(config => {
      console.log('config', config);
      this.imdbImage.base_url = config.images.secure_base_url;
    });

    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.movieId = parseInt(params.get('id')!, 0);
        return this.imdbMovie.getMovie(this.movieId);
      }),
      tap(movie => {
        console.log('movie', movie);
        this.runtimeHours = (movie.runtime ?? 0) / 60;
        this.runtimeMinutes = Math.floor((movie.runtime ?? 0) % 60);
        this.userScore = {
          datasets: [
            {
              data: [movie.popularity, 100 - movie.popularity],
              backgroundColor: ['#00ff00', '#000000']
            }
          ]
        }
      }),
      catchError(err => {
        this.error = err;
        return throwError(err);
      })
    );

    this.credits$ = this.movie$.pipe(
      switchMap(movie => this.imdbMovie.getCredits(movie.id)),
      tap(credits => {
        console.log('credits', credits);

      }),
    );
    this.keywords$ = this.movie$.pipe(
      switchMap(movie => this.imdbMovie.getKeywords(movie.id)),
      tap(keywords => {
        console.log('keywords', keywords);
      }),
    );
  }
}
