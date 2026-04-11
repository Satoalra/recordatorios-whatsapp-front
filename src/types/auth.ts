import type { Session, User } from '@supabase/supabase-js'

export interface AuthContext {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export interface RouterAuthContext {
  session: Session | null
  loading: boolean
}
