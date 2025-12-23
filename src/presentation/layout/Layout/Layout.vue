<template>
  <div class="min-h-screen bg-background flex flex-col">
    <Header :title="title" :show-back-button="showBackButton" />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../Header'
import Footer from '../Footer'

interface Props {
  title?: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: false,
})
</script>

