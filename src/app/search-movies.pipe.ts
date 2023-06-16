import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMovies'
})
export class SearchMoviesPipe implements PipeTransform {

  transform(listMovies:any[], term:string, typeMovie?:string): any[] {
    if (typeMovie == 'movie') {
      return listMovies.filter((movie) => movie.title.toLowerCase().includes(term.toLowerCase()));
    } else {
      return listMovies.filter((movie) => movie.name.toLowerCase().includes(term.toLowerCase()));
    }
  }

}
