import type { LoginCredentials, LoginResponse } from '../entities/User'

export interface UserRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>
  logout(): Promise<void>
}

