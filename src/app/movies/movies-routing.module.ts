import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopMoviesComponent} from "./components/top-movies/top-movies.component";
import {MovieComponent} from "./components/movie/movie.component";
import {MovieSearchComponent} from "./components/movie-search/movie-search.component";

const routes: Routes = [
  { path: 'movie/:id', component: MovieComponent, },
  { path: 'top-movies', component: TopMoviesComponent, },
  { path: 'search', component: MovieSearchComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
