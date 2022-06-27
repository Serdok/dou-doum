import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {ImageModule} from "primeng/image";
import {CardModule} from "primeng/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    TopMoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    PaginatorModule,
    SkeletonModule,
    ImageModule,
    CardModule,
    FontAwesomeModule
  ]
})
export class MoviesModule { }
