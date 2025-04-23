export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'|'moderator'|'superadmin'
  created_at: string
  updated_at: string
  token: string | null
}
