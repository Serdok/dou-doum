import { Component, OnInit } from '@angular/core';
import {faFilm, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {MenuItem} from "primeng/api";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-homepage',
  templateUrl: './movie-homepage.component.html',
  styleUrls: ['./movie-homepage.component.sass']
})
export class MovieHomepageComponent implements OnInit {
  menuItems!: MenuItem[];

  search = new FormControl('', [Validators.required]);

  faFilm = faFilm;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Top movies',
        icon: 'pi pi-chart-line',
        routerLink: 'top-movies'
      },
    ];
  }

}
