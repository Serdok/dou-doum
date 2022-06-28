import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {environment} from '../environments/environment';

const routes: Routes = [
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule), }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: !environment.production, }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
