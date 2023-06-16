import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  listTv:any[] = [];
  term:string = '';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  paginationNum: any[] = [];
  currentNumPage: number = 1;

  constructor(private _moviesService:MoviesService) {}
  
  ngOnInit(): void {
    this.paginationNum = new Array(10).fill(' ').map((num, index) => index+1);
     this._moviesService.getMoviesByPageNumber(1, 'tv').subscribe({
      next: (response)=> {
        console.log(response.results);

        this.listTv = response.results;
      }
    });
  }

  changeMoviesByNumber(num: number) : void {
    this._moviesService.getMoviesByPageNumber(num, 'tv').subscribe({
      next: (response) => {
        this.listTv = response.results;
      },
    });
    this.currentNumPage = num;
  }

  prevPage () {
    this.changeMoviesByNumber(--this.currentNumPage);
  }
  
  nexPage () {
    this.changeMoviesByNumber(++this.currentNumPage);
  }
}
