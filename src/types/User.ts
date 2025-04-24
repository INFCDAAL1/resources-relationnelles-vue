export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'modo' | 'superadmin'
  created_at: string
  updated_at: string
  token: string | null
}

export interface UserResponse {
  data: Partial<User>[];
}
