import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

export interface ITopRatedMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1) {
    return this.http
      .get<ITopRatedMovies>(
        `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
      )
      .pipe(
        map((movies: ITopRatedMovies) => {
          const movieResults = movies.results.map((movie: IMovie) => {
            const posterPath = `${environment.images}/w92${movie.poster_path}`;
            movie.poster_path = posterPath;
            return movie;
          });
          movies.results = movieResults;
          return movies;
        })
      );
  }

  getMovieDetails(id: string) {
    return this.http
      .get<IMovie>(
        `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
      )
      .pipe(
        map((movie: IMovie) => {
          const posterPath = `${environment.images}/w400${movie.poster_path}`;
          movie.poster_path = posterPath;
          return movie;
        })
      );
  }
}
