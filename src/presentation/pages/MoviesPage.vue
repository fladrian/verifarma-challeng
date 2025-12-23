<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-secondary border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-text-primary">Películas</h1>
          <div class="flex items-center space-x-4">
            <span v-if="authStore.user" class="text-text-secondary">
              {{ authStore.user.name }}
            </span>
            <Button
              variant="tertiary"
              icon="mdi:logout"
              @click="handleLogout"
            >
              Salir
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="mb-8 space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Title Search -->
          <div class="flex-1">
            <Input
              id="title-search"
              v-model="searchQuery"
              label="Buscar por título"
              placeholder="Ej: Batman, Inception..."
              @update:model-value="handleSearch"
            />
          </div>

          <!-- Year Filter -->
          <div class="w-full md:w-48">
            <Input
              id="year-filter"
              v-model="yearFilter"
              label="Año"
              placeholder="Ej: 2020"
              @update:model-value="handleFilterChange"
            />
          </div>

          <!-- Type Filter -->
          <div class="w-full md:w-48">
            <Select
              id="type-filter"
              v-model="typeFilter"
              label="Tipo"
              @update:model-value="handleFilterChange"
            >
              <option value="">Todos</option>
              <option value="movie">Película</option>
              <option value="series">Serie</option>
              <option value="episode">Episodio</option>
            </Select>
          </div>
        </div>
      </div>

      <!-- Loading with Skeletons -->
      <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <MovieCardSkeleton v-for="n in 10" :key="n" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-button">
        {{ error }}
      </div>

      <!-- Movies Grid -->
      <div v-else-if="movies && movies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <MovieCard
          v-for="movie in movies"
          :key="movie.imdbID"
          :title="movie.Title"
          :poster="movie.Poster"
          :year="movie.Year"
          :imdbID="movie.imdbID"
          @click="(id: string) => goToMovieDetail(id)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <Icon icon="mdi:movie-off" class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <p class="text-text-secondary">No se encontraron películas</p>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center space-x-4 mt-8"
      >
        <Button
          variant="secondary"
          icon="mdi:chevron-left"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        />
        <span class="text-text-secondary">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        <Button
          variant="secondary"
          icon="mdi:chevron-right"
          icon-position="right"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@application/stores'
import { useMovies, useFilterMovies } from '@data/composables'
import type { MovieSearchResult } from '@core/entities'
import { MovieCardSkeleton, Button, Input, Select, MovieCard } from '../components'

const router = useRouter()
const authStore = useAuthStore()

const currentPage = ref(1)
const searchQuery = ref('')
const yearFilter = ref('')
const typeFilter = ref('')

// Use appropriate query based on search
const moviesQuery = useMovies(currentPage, yearFilter, typeFilter)
const filterQuery = useFilterMovies(searchQuery, currentPage, yearFilter, typeFilter)

const activeQuery = computed(() => searchQuery.value.trim().length > 0 ? filterQuery : moviesQuery)

const movies = computed<MovieSearchResult[]>(() => activeQuery.value.data?.value?.results || [])
const totalPages = computed(() => activeQuery.value.data?.value?.totalPages || 0)
const isLoading = computed(() => activeQuery.value.isLoading.value)
const error = computed(() => {
  const err = activeQuery.value.error.value
  if (err) {
    return err instanceof Error ? err.message : String(err)
  }
  return null
})

// Watch filter changes
watch([searchQuery, yearFilter, typeFilter], () => {
  currentPage.value = 1
})

const handleSearch = () => {
  // Query will automatically refetch when searchQuery changes
}

const handleFilterChange = () => {
  // Query will automatically refetch when filters change
  currentPage.value = 1
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goToMovieDetail = (imdbID: string) => {
  if (imdbID && imdbID !== 'undefined') {
    router.push(`/movies/${imdbID}`)
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>


