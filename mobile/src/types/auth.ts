import type { Session, User } from '@supabase/supabase-js';

export type AppRole = 'client' | 'therapist' | 'admin';

export interface AppProfile {
  id: string;
  auth_user_id?: string | null;
  email?: string | null;
  name?: string | null;
  user_role: AppRole;
  status?: string | null;
}

export interface AuthContextValue {
  loading: boolean;
  session: Session | null;
  user: User | null;
  profile: AppProfile | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}
