<template>
  <header class="bg-background-secondary border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <button
            v-if="showBackButton"
            @click="handleBack"
            class="flex items-center text-text-primary hover:text-accent transition-colors mr-4"
          >
            <Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
            Volver
          </button>
          <div class="mr-4 p-1 rounded-lg bg-gradient-to-r from-primary via-accent to-primary">
            <img
              :src="logoImage"
              alt="Verifarma"
              class="h-12 rounded-md bg-background-secondary"
            />
          </div>
          <h1 v-if="title" class="text-2xl font-bold text-text-primary">
            {{ title }}
          </h1>
        </div>
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@application/stores'
import { Button } from '@presentation/shared/components'
import { Icon } from '@iconify/vue'
import logoImage from '../../assets/verifarma-stream.png'

interface Props {
  title?: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: false,
})

const router = useRouter()
const authStore = useAuthStore()

const handleBack = () => {
  router.back()
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

