import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../models/imdb/movie";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.sass']
})
export class MovieCardComponent implements OnInit {
  @Input('movie') movie!: Movie;
  error!: any;

  constructor(public imdbImage: ImdbImageService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  navigateTo(id: number): void {
    // using a function rather than [routerLink] to explicitly set a starting point (relativeTo)
    this.router.navigate(['movie', id], {relativeTo: this.route.parent,});
  }
}
