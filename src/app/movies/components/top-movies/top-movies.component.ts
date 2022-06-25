import { Component, OnInit } from '@angular/core';
import {ImdbMovieService} from "../../../services/imdb/imdb-movie.service";
import {Movie} from "../../../models/imdb/movie";

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.sass']
})
export class TopMoviesComponent implements OnInit {
  movies: Movie[] | null = null;

  constructor(private imdbMovie: ImdbMovieService) { }

  ngOnInit(): void {
    this.imdbMovie.getTopRatedMovies().subscribe(result => {
      this.movies = result.results;
    })
  }

}
