import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TvComponent } from './tv/tv.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { navGuard } from './guards/nav-guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth',canActivate: [navGuard], component: AuthComponent, title: 'Authentication'},
  {path: 'home', canActivate: [AuthGuard] , component: HomeComponent, title: 'Home'},
  {path: 'movies', canActivate: [AuthGuard] , component: MoviesComponent, title: 'Movies'},
  {path: 'movieDetails/:type/:id', canActivate: [AuthGuard] , component: MovieDetailsComponent, title: 'MovieDetails'},
  {path: 'tv', canActivate: [AuthGuard] , component: TvComponent, title: 'TV'},
  {path: '**', component: NotFoundComponent, title: 'NotFounded'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
