import {Component, Input, OnInit} from '@angular/core';
import {Cast} from "../../../models/imdb/cast";
import {ImdbImageService} from "../../../services/imdb/imdb-image.service";

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html',
  styleUrls: ['./cast-card.component.sass']
})
export class CastCardComponent implements OnInit {
  @Input() cast!: Cast;

  error!: any;

  constructor(public imdbImage: ImdbImageService) { }

  ngOnInit(): void {
  }

}
