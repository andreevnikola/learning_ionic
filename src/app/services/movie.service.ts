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

export interface Videos {
  id: number;
  results: Video[];
  trailer?: Video | undefined;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
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
            movie.poster_path = `${environment.images}/w92${movie.poster_path}`;
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
          movie.poster_path = `${environment.images}/w400${movie.poster_path}`;
          movie.backdrop_path = `${environment.images}/w400${movie.backdrop_path}`;
          return movie;
        })
      );
  }

  getVideo(id: string) {
    return this.http
      .get<Videos>(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${environment.apiKey}`
      )
      .pipe(
        map((data: Videos) => {
          let trailer;
          data.results.forEach((data: Video) => {
            if (data.type === 'Trailer') {
              console.log('gay');
              trailer = data;
              trailer.key = `https://www.youtube.com/embed/${data.key}`;
              return;
            }
          });
          data.results = data.results
            .filter((data) => data.site == 'YouTube')
            .slice(0, 3);
          data.results.map((data: Video) => {
            data.key = `https://www.youtube.com/embed/${data.key}`;
            return data;
          });
          data.trailer = trailer;
          return data;
        })
      );
  }
}
