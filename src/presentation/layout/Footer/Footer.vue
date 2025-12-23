<template>
  <footer class="bg-background-secondary border-t border-gray-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-text-secondary text-sm">
          <p>&copy; {{ currentYear }} Verifarma Challenge. Todos los derechos reservados.</p>
        </div>
        <div class="flex items-center space-x-6 text-text-secondary text-sm">
          <a href="#" class="hover:text-accent transition-colors">Términos de Uso</a>
          <a href="#" class="hover:text-accent transition-colors">Privacidad</a>
          <a href="#" class="hover:text-accent transition-colors">Contacto</a>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-800 text-center text-text-muted text-xs">
        <p>Datos proporcionados por <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">OMDb API</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

