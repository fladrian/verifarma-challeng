import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LoginCredentials, LoginResponse, User } from '@core/entities'
import { UserRepositoryImpl } from '@data/repositories'
import { LoginCredentialsSchema } from '@core/entities'

const userRepository = new UserRepositoryImpl()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Initialize from localStorage
  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    isLoading.value = true
    error.value = null

    try {
      // Validate with Zod
      LoginCredentialsSchema.parse(credentials)
      
      const response = await userRepository.login(credentials)
      user.value = response.user
      token.value = response.token
      return response
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Error al iniciar sesión'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await userRepository.logout()
    user.value = null
    token.value = null
    error.value = null
  }

  // Initialize on store creation
  initializeAuth()

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  }
})

