import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopMoviesComponent} from "./components/top-movies/top-movies.component";
import {MovieComponent} from "./components/movie/movie.component";
import {MovieSearchComponent} from "./components/movie-search/movie-search.component";
import {MovieHomepageComponent} from "./components/movie-homepage/movie-homepage.component";
import {MovieTitleResolver} from "../common/movie-title.resolver";

const routes: Routes = [
  { path: '', title: 'Movies - Home', component: MovieHomepageComponent, children: [
      { path: 'movie/:id', title: MovieTitleResolver, component: MovieComponent,  },
      { path: 'top-movies', title: 'Movies - Top Rated', component: TopMoviesComponent,  },
      { path: 'search', title: 'Movies - Search', component: MovieSearchComponent,  },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
