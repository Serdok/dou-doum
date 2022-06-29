import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../models/imdb/movie";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.sass']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  error!: any;

  constructor(public imdbImage: ImdbImageService) {
  }

  ngOnInit(): void {
  }
}
