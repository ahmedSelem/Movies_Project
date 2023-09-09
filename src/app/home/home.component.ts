import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingAll: any[] = [];
  trendingTV : any[] = [];
  trendingFilms : any[] = [];
  nowPlayingSubsc? : Subscription;
  getTrendingTvSubsc? : Subscription;
  getTrendingMovieSubsc? : Subscription;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    
    this.nowPlayingSubsc = this._moviesService.getNowPlayingMovie().subscribe({
      next: (response) => {
        this.trendingAll = response.results.slice(0, 10)
      },
    });
    this.getTrendingTvSubsc = this._moviesService.getTrending('tv').subscribe({
      next: (response) => {
        this.trendingTV = response.results.slice(0, 8);
      },
    });
    this.getTrendingMovieSubsc = this._moviesService.getTrending('movie').subscribe({
      next: (response) => {
        this.trendingFilms = response.results.slice(0, 8);
        console.log(response);
      },
    });

  }


  ngOnDestroy(): void {
    this.nowPlayingSubsc?.unsubscribe();
    this.getTrendingTvSubsc?.unsubscribe();
    this.getTrendingMovieSubsc?.unsubscribe();
  }
}
