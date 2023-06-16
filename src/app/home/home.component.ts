import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trendingAll: any[] = [];
  trendingTV : any[] = [];
  trendingFilms : any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    this._moviesService.getNowPlayingMovie().subscribe({
      next: (response) => {
        this.trendingAll = response.results.slice(0, 10);
      },
    });
    this._moviesService.getTrending('tv').subscribe({
      next: (response) => {
        this.trendingTV = response.results.slice(0, 8);
      },
    });
    this._moviesService.getTrending('movie').subscribe({
      next: (response) => {
        this.trendingFilms = response.results.slice(0, 8);
      },
    });
  }
}
