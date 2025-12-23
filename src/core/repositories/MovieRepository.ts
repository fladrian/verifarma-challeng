import type { Movie, MoviesResponse } from '../entities/Movie'

export interface MovieRepository {
  getMovies(page?: number, year?: string, type?: string): Promise<MoviesResponse>
  getMovie(id: string): Promise<Movie>
  filterMovies(query: string, page?: number, year?: string, type?: string): Promise<MoviesResponse>
}

