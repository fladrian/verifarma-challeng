import axios, { type AxiosInstance } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://www.omdbapi.com'

// Extract only the API key, removing any URL or query string if present
// This handles cases where users might accidentally paste the full URL
function extractApiKey(rawKey: string): string {
  if (!rawKey) return ''
  
  // If it contains a URL, extract the key from query params
  if (rawKey.includes('?apikey=')) {
    const match = rawKey.match(/[?&]apikey=([^&]+)/)
    return match ? match[1] : rawKey
  }
  
  // If it contains just apikey=, extract it
  if (rawKey.includes('apikey=')) {
    const match = rawKey.match(/apikey=([^&]+)/)
    return match ? match[1] : rawKey
  }
  
  // Otherwise, return as is (should be just the key)
  return rawKey.trim()
}

const API_KEY = extractApiKey(import.meta.env.VITE_OMDB_API_KEY || '')

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor - Add API key to params for OMDb
apiClient.interceptors.request.use(
  (config) => {
    // Ensure API key is always in params for OMDb
    if (API_KEY && API_KEY.length > 0) {
      config.params = config.params || {}
      config.params.apikey = API_KEY
    }
    return config
  },
  (error) => Promise.reject(error)
)

