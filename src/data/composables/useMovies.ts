import { computed, ref, type Ref, type ComputedRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { MovieRepositoryImpl } from '../repositories'
import type { Movie, MoviesResponse } from '@core/entities'

const movieRepository = new MovieRepositoryImpl()

export function useMovies(page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', computed(() => page.value), computed(() => year?.value), computed(() => type?.value)],
    queryFn: () => movieRepository.getMovies(page.value, year?.value, type?.value),
  })
}

export function useMovie(id: string | Ref<string> | ComputedRef<string>) {
  const idRef = typeof id === 'string' ? ref(id) : id
  return useQuery<Movie>({
    queryKey: ['movie', computed(() => typeof idRef === 'string' ? idRef : idRef.value)],
    queryFn: () => movieRepository.getMovie(typeof idRef === 'string' ? idRef : idRef.value),
    enabled: computed(() => {
      const value = typeof idRef === 'string' ? idRef : idRef.value
      return !!value && value.length > 0
    }),
  })
}

export function useFilterMovies(query: Ref<string>, page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', 'search', computed(() => query.value), computed(() => page.value), computed(() => year?.value), computed(() => type?.value)],
    queryFn: () => movieRepository.filterMovies(query.value, page.value, year?.value, type?.value),
    enabled: computed(() => query.value.length > 0),
  })
}

