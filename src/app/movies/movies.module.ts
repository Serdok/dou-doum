import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {ImageModule} from "primeng/image";
import {CardModule} from "primeng/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { MovieComponent } from './components/movie/movie.component';
import {SharedModule} from "../shared.module";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import { CastCardComponent } from './components/cast-card/cast-card.component';
import {StyleClassModule} from "primeng/styleclass";
import {CarouselModule} from "primeng/carousel";
import {TooltipModule} from "primeng/tooltip";
import {ChartModule} from "primeng/chart";
import { MovieCardComponent } from './components/movie-card/movie-card.component';


@NgModule({
  declarations: [
    TopMoviesComponent,
    MovieComponent,
    CastCardComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    PaginatorModule,
    SkeletonModule,
    ImageModule,
    CardModule,
    FontAwesomeModule,
    SharedModule,
    TagModule,
    ButtonModule,
    StyleClassModule,
    CarouselModule,
    TooltipModule,
    ChartModule,
  ]
})
export class MoviesModule { }
