import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopMoviesComponent} from "./components/top-movies/top-movies.component";

const routes: Routes = [
  { path: 'top-movies', component: TopMoviesComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
