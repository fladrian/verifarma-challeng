<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="flex flex-col items-center mb-4">
          <h1 class="text-4xl font-bold text-text-primary mb-4">Bienvenido a</h1>
          <div class="p-1 rounded-lg bg-gradient-to-r from-primary via-accent to-primary">
            <img
              :src="logoImage"
              alt="Verifarma"
              class="h-16 rounded-md bg-background-secondary"
            />
          </div>
        </div>
        <p class="text-text-secondary">Inicia sesión para continuar</p>
      </div>

      <form @submit="onSubmit" class="space-y-6 bg-background-secondary p-8 rounded-lg shadow-card">
        <div>
          <label for="email" class="block text-sm font-medium text-text-secondary mb-2">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            v-slot="{ field, meta }"
          >
            <input
              v-bind="field"
              :class="[
                'w-full px-4 py-3 bg-background-tertiary border rounded-button text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition',
                meta.touched && !meta.valid ? 'border-red-600' : 'border-gray-700'
              ]"
              placeholder="tu@email.com"
            />
          </Field>
          <ErrorMessage name="email" class="mt-1 text-sm text-red-400" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-text-secondary mb-2">
            Contraseña
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            v-slot="{ field, meta }"
          >
            <input
              v-bind="field"
              :class="[
                'w-full px-4 py-3 bg-background-tertiary border rounded-button text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition',
                meta.touched && !meta.valid ? 'border-red-600' : 'border-gray-700'
              ]"
              placeholder="••••••••"
            />
          </Field>
          <ErrorMessage name="password" class="mt-1 text-sm text-red-400" />
        </div>

        <div v-if="authStore.error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-button text-sm">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          :disabled="authStore.isLoading || isSubmitting"
          class="w-full py-3 px-4 bg-primary text-white font-medium rounded-button hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <Icon
            v-if="authStore.isLoading || isSubmitting"
            icon="mdi:loading"
            class="animate-spin w-5 h-5 mr-2"
          />
          <Icon v-else icon="mdi:login" class="w-5 h-5 mr-2" />
          {{ authStore.isLoading || isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@application/stores'
import { Icon } from '@iconify/vue'
import logoImage from '@presentation/assets/verifarma-stream.png'
import { loginFormSchema } from '@data/schemas/loginSchema'

const router = useRouter()
const authStore = useAuthStore()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginFormSchema),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
    router.push('/movies')
  } catch (error) {
    console.error('Error en login:', error)
  }
})
</script>

