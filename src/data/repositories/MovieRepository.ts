import type { MovieRepository } from '@core/repositories'
import type { Movie, MoviesResponse, OMDbSearchResponse } from '@core/entities'
import { apiClient } from '@shared/config/axios'

export class MovieRepositoryImpl implements MovieRepository {
  async getMovies(page: number = 1, year?: string, type?: string): Promise<MoviesResponse> {
    // OMDb API requires a search term, so we'll use a popular search term for default movies
    // Using 'movie' as a default search term to get popular movies
    const params: Record<string, string | number> = {
      s: 'movie',
      page,
    }
    
    if (year && year.trim().length > 0) {
      params.y = year
    }
    
    if (type && type.trim().length > 0) {
      params.type = type
    }

    const response = await apiClient.get<OMDbSearchResponse>('', { params })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching movies')
    }

    const totalResults = parseInt(response.data.totalResults || '0', 10)
    const totalPages = Math.ceil(totalResults / 10) // OMDb returns 10 results per page

    return {
      results: response.data.Search || [],
      page,
      totalPages,
      totalResults,
    }
  }

  async getMovie(id: string): Promise<Movie> {
    const response = await apiClient.get<Movie>('', {
      params: {
        i: id,
        plot: 'full', // Get full plot
      },
    })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching movie details')
    }

    return response.data
  }

  async filterMovies(query: string, page: number = 1, year?: string, type?: string): Promise<MoviesResponse> {
    if (!query || query.trim().length === 0) {
      return this.getMovies(page, year, type)
    }

    const params: Record<string, string | number> = {
      s: query,
      page,
    }
    
    if (year && year.trim().length > 0) {
      params.y = year
    }
    
    if (type && type.trim().length > 0) {
      params.type = type
    }

    const response = await apiClient.get<OMDbSearchResponse>('', { params })

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error searching movies')
    }

    const totalResults = parseInt(response.data.totalResults || '0', 10)
    const totalPages = Math.ceil(totalResults / 10) // OMDb returns 10 results per page

    return {
      results: response.data.Search || [],
      page,
      totalPages,
      totalResults,
    }
  }
}

