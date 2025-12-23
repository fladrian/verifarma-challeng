<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-background-secondary border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <button
            @click="goBack"
            class="flex items-center text-text-primary hover:text-accent transition-colors"
          >
            <Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
            Volver
          </button>
          <div class="flex items-center space-x-4">
            <span v-if="authStore.user" class="text-text-secondary">
              {{ authStore.user.name }}
            </span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-text-primary bg-background-tertiary rounded-button hover:bg-gray-700 transition-colors flex items-center"
            >
              <Icon icon="mdi:logout" class="w-4 h-4 mr-2" />
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading -->
      <div v-if="isLoading">
        <MovieDetailSkeleton />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-button">
        {{ error }}
      </div>

      <!-- Movie Details -->
      <div v-else-if="movie" class="space-y-8">
        <!-- Poster and Basic Info -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Poster -->
          <div class="w-full md:w-80 flex-shrink-0">
            <div class="aspect-[2/3] bg-background-secondary rounded-card overflow-hidden shadow-card">
              <img
                v-if="movie.Poster && movie.Poster !== 'N/A'"
                :src="movie.Poster"
                :alt="movie.Title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
                <Icon icon="mdi:movie-open" class="w-24 h-24 text-text-muted" />
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 space-y-4">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                {{ movie.Title }}
              </h1>
              <div class="flex flex-wrap items-center gap-4 text-text-secondary">
                <span v-if="movie.Year" class="text-lg">{{ movie.Year }}</span>
                <span v-if="movie.Rated && movie.Rated !== 'N/A'" class="px-2 py-1 bg-background-tertiary rounded-button text-sm">
                  {{ movie.Rated }}
                </span>
                <span v-if="movie.Runtime && movie.Runtime !== 'N/A'">{{ movie.Runtime }}</span>
                <span v-if="movie.Genre && movie.Genre !== 'N/A'">{{ movie.Genre }}</span>
              </div>
            </div>

            <!-- Ratings -->
            <div v-if="movie.Ratings && movie.Ratings.length > 0" class="flex flex-wrap gap-4">
              <div
                v-for="rating in movie.Ratings"
                :key="rating.Source"
                class="bg-background-secondary px-4 py-2 rounded-button"
              >
                <div class="text-xs text-text-muted">{{ rating.Source }}</div>
                <div class="text-lg font-semibold text-text-primary">{{ rating.Value }}</div>
              </div>
              <div v-if="movie.imdbRating && movie.imdbRating !== 'N/A'" class="bg-background-secondary px-4 py-2 rounded-button">
                <div class="text-xs text-text-muted">IMDb</div>
                <div class="text-lg font-semibold text-text-primary">{{ movie.imdbRating }}/10</div>
              </div>
              <div v-if="movie.Metascore && movie.Metascore !== 'N/A'" class="bg-background-secondary px-4 py-2 rounded-button">
                <div class="text-xs text-text-muted">Metascore</div>
                <div class="text-lg font-semibold text-text-primary">{{ movie.Metascore }}</div>
              </div>
            </div>

            <!-- Plot -->
            <div v-if="movie.Plot && movie.Plot !== 'N/A'">
              <h2 class="text-xl font-semibold text-text-primary mb-2">Sinopsis</h2>
              <p class="text-text-secondary leading-relaxed">{{ movie.Plot }}</p>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Director -->
          <div v-if="movie.Director && movie.Director !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Director</h3>
            <p class="text-text-secondary">{{ movie.Director }}</p>
          </div>

          <!-- Writers -->
          <div v-if="movie.Writer && movie.Writer !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Escritores</h3>
            <p class="text-text-secondary">{{ movie.Writer }}</p>
          </div>

          <!-- Actors -->
          <div v-if="movie.Actors && movie.Actors !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Actores</h3>
            <p class="text-text-secondary">{{ movie.Actors }}</p>
          </div>

          <!-- Language -->
          <div v-if="movie.Language && movie.Language !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Idioma</h3>
            <p class="text-text-secondary">{{ movie.Language }}</p>
          </div>

          <!-- Country -->
          <div v-if="movie.Country && movie.Country !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">País</h3>
            <p class="text-text-secondary">{{ movie.Country }}</p>
          </div>

          <!-- Released -->
          <div v-if="movie.Released && movie.Released !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Fecha de Estreno</h3>
            <p class="text-text-secondary">{{ movie.Released }}</p>
          </div>

          <!-- Awards -->
          <div v-if="movie.Awards && movie.Awards !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Premios</h3>
            <p class="text-text-secondary">{{ movie.Awards }}</p>
          </div>

          <!-- Box Office -->
          <div v-if="movie.BoxOffice && movie.BoxOffice !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Taquilla</h3>
            <p class="text-text-secondary">{{ movie.BoxOffice }}</p>
          </div>

          <!-- Production -->
          <div v-if="movie.Production && movie.Production !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Producción</h3>
            <p class="text-text-secondary">{{ movie.Production }}</p>
          </div>

          <!-- IMDb Votes -->
          <div v-if="movie.imdbVotes && movie.imdbVotes !== 'N/A'">
            <h3 class="text-lg font-semibold text-text-primary mb-2">Votos IMDb</h3>
            <p class="text-text-secondary">{{ movie.imdbVotes }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@application/stores'
import { useMovie } from '@data/composables'
import { Icon } from '@iconify/vue'
import { MovieDetailSkeleton } from '../components'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const movieId = computed(() => route.params.id as string)
const movieQuery = useMovie(movieId)

const movie = computed(() => movieQuery.data?.value)
const isLoading = computed(() => movieQuery.isLoading.value)
const error = computed(() => {
  const err = movieQuery.error.value
  if (err) {
    return err instanceof Error ? err.message : String(err)
  }
  return null
})

const goBack = () => {
  router.back()
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

