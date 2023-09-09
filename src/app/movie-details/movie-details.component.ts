import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../shared/movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit , OnDestroy{
  movieId: string = '';
  movieType: string = '';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  movieOBJ?: Movie;
  movieByIdSubsc? : Subscription;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.movieId = this._activatedRoute.snapshot.params['id'];
    this.movieType = this._activatedRoute.snapshot.params['type'];

    this.movieByIdSubsc = this._moviesService.getMovieById(this.movieId, this.movieType).subscribe({
      next: (response : Movie) => {
        this.movieOBJ = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  ngOnDestroy(): void {
    this.movieByIdSubsc?.unsubscribe();
  }
}
