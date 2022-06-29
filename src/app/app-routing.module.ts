import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {environment} from '../environments/environment';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule), },
    ],
  },
  { path: '**', redirectTo: 'home', },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: !environment.production, }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
