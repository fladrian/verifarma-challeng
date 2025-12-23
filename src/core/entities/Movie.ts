import { z } from 'zod'

// Rating schema for OMDb API
export const RatingSchema = z.object({
  Source: z.string(),
  Value: z.string(),
})

// Movie schema matching OMDb API response
export const MovieSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Rated: z.string().optional(),
  Released: z.string().optional(),
  Runtime: z.string().optional(),
  Genre: z.string().optional(),
  Director: z.string().optional(),
  Writer: z.string().optional(),
  Actors: z.string().optional(),
  Plot: z.string().optional(),
  Language: z.string().optional(),
  Country: z.string().optional(),
  Awards: z.string().optional(),
  Poster: z.string().optional(),
  Ratings: z.array(RatingSchema).optional(),
  Metascore: z.string().optional(),
  imdbRating: z.string().optional(),
  imdbVotes: z.string().optional(),
  Type: z.string().optional(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional(),
  Response: z.string().optional(),
  Error: z.string().optional(),
})

// Search result schema (simplified for list view)
export const MovieSearchResultSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Type: z.string().optional(),
  Poster: z.string().optional(),
})

// OMDb Search Response
export const OMDbSearchResponseSchema = z.object({
  Search: z.array(MovieSearchResultSchema).optional(),
  totalResults: z.string().optional(),
  Response: z.string(),
  Error: z.string().optional(),
})

// MoviesResponse adapted for our app structure
export const MoviesResponseSchema = z.object({
  results: z.array(MovieSearchResultSchema),
  page: z.number(),
  totalPages: z.number(),
  totalResults: z.number(),
})

export type Movie = z.infer<typeof MovieSchema>
export type MovieSearchResult = z.infer<typeof MovieSearchResultSchema>
export type OMDbSearchResponse = z.infer<typeof OMDbSearchResponseSchema>
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>
export type Rating = z.infer<typeof RatingSchema>

