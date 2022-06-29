import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faFilm, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {mergeMap, Observable, tap, zipAll} from "rxjs";
import {ImdbSearchService} from "../../../services/imdb/imdb-search.service";
import {FormControl, Validators} from "@angular/forms";
import {Result} from "../../../models/imdb/result";
import {Movie} from "../../../models/imdb/movie";
import {ImdbService} from "../../../services/imdb/imdb.service";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";
import {ImdbMovieService} from "../../../services/imdb/imdb-movie.service";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent implements OnInit {
  @Input() query!: string | null;
  @Input() page: number = 1;
  @Input() include_adult: boolean = true;
  search = new FormControl('', [Validators.required]);
  adult = new FormControl(true);

  results$!: Observable<Result<Movie>>;
  movies$!: Observable<Movie[]>;
  first: number = 0;

  faFilm = faFilm;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private route: ActivatedRoute, private imdbSearch: ImdbSearchService, private imdbMovie: ImdbMovieService,
              private imdb: ImdbService, private imdbImage: ImdbImageService, private router: Router) {
  }

  ngOnInit(): void {
    this.imdb.getConfiguration().subscribe(config => {
      this.imdbImage.base_url = config.images.secure_base_url;
    })

    if (!this.query) {
      // Query not provided in the component's input, try and get it from the route query params
      this.route.queryParamMap.subscribe(params => {
        this.query = params.get('query');
        this.page = parseInt(params.get('page') ?? '1', 0);
        this.include_adult = (params.get('include_adult') ?? 'true').toLowerCase() === 'true';
      });
    }

    this.search.setValue(this.query);
    this.adult.setValue(this.include_adult);
    this.onSearch();
  }

  onSearch(): void {
    if (this.search.value) {
      this.refreshData(this.page, this.adult.value ?? true);
    }
  }

  paginate(event: any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    this.first = event.first;
    this.refreshData(event.page + 1);
  }

  refreshData(page: number = 1, include_adult: boolean = true) {
    this.results$ = this.imdbSearch.searchMovie(this.search.value!, page, include_adult).pipe(tap(result => console.log('result', result)));
    this.movies$ = this.results$.pipe(
      mergeMap(result => {
        return result.results.map(movie => this.imdbMovie.getMovie(movie.id));
      }),
      zipAll(),
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        'query': this.search.value!,
        page,
        include_adult,
      },
      queryParamsHandling: 'merge'
    });
  }
}
