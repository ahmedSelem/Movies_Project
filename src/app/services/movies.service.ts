import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesResponse, Movie } from '../shared/movie.model';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private _http:HttpClient) { }

  getNowPlayingMovie():Observable<MoviesResponse> {
    return this._http.get<MoviesResponse>('https://api.themoviedb.org/3/trending/all/day?api_key=f202556543bdc7cdad5094cf0ebc99aa');
  }

  getTrending(typeMovie:string):Observable<MoviesResponse> {
    return this._http.get<MoviesResponse>('https://api.themoviedb.org/3/trending/'+typeMovie+'/day?api_key=f202556543bdc7cdad5094cf0ebc99aa');
  }

  getMoviesByPageNumber(pageNum:number, typeMovie:string) : Observable<MoviesResponse> {
    return this._http.get<MoviesResponse>('https://api.themoviedb.org/3/discover/'+typeMovie+'?include_adult=false&include_video=false&language=en-US&page='+pageNum+'&api_key=f202556543bdc7cdad5094cf0ebc99aa')
  }

  getMovieById(movieId:string, typeMovie:string):Observable<Movie> {
    return this._http.get<Movie>('https://api.themoviedb.org/3/'+typeMovie+'/'+movieId+'?api_key=f202556543bdc7cdad5094cf0ebc99aa');
  }


}
