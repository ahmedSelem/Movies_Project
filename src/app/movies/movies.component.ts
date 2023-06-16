import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  trendingMovies : any[] = [];
  term:string = '';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  paginationNum: any[] = [];
  currentNumPage: number = 1;
  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    this.paginationNum = new Array(10).fill(' ').map((index, num)=> num+1);
    this._moviesService.getMoviesByPageNumber(1, 'movie').subscribe({
      next: (response) => {
        this.trendingMovies = response.results;
      },
    });
  }

  changeMoviesByNumber(num: number) : void {
    this._moviesService.getMoviesByPageNumber(num, 'movie').subscribe({
      next: (response) => {
        this.trendingMovies = response.results;
      },
    });
    this.currentNumPage = num;
    console.log(num);
  }
  prevPage () {
    this.changeMoviesByNumber(--this.currentNumPage);
  }
  nexPage () {
    this.changeMoviesByNumber(++this.currentNumPage);
  }

}
