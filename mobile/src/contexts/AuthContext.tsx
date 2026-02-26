import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Linking from 'expo-linking';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { AppProfile, AuthContextValue } from '../types/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadProfileForUser(user: User): Promise<AppProfile | null> {
  const { data: directProfile, error: directError } = await supabase
    .from('ifs_clients')
    .select('id, auth_user_id, email, name, user_role, status')
    .eq('auth_user_id', user.id)
    .maybeSingle();

  if (directError) {
    console.warn('Profile lookup by auth_user_id failed', directError.message);
  }

  if (directProfile) {
    return directProfile as AppProfile;
  }

  if (!user.email) {
    return null;
  }

  const { data: emailProfile, error: emailError } = await supabase
    .from('ifs_clients')
    .select('id, auth_user_id, email, name, user_role, status')
    .eq('email', user.email)
    .maybeSingle();

  if (emailError) {
    console.warn('Profile lookup by email failed', emailError.message);
    return null;
  }

  if (!emailProfile) {
    return null;
  }

  if (!emailProfile.auth_user_id) {
    const { error: attachError } = await supabase
      .from('ifs_clients')
      .update({ auth_user_id: user.id })
      .eq('id', emailProfile.id);

    if (attachError) {
      console.warn('Failed to attach auth_user_id to existing profile', attachError.message);
    }
  }

  return {
    ...(emailProfile as AppProfile),
    auth_user_id: user.id,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<AuthContextValue['session']>(null);
  const [profile, setProfile] = useState<AppProfile | null>(null);

  const hydrateProfile = useCallback(async (user: User | null) => {
    if (!user) {
      setProfile(null);
      return;
    }

    const nextProfile = await loadProfileForUser(user);
    setProfile(nextProfile);
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data, error }) => {
      if (!mounted) return;
      if (error) {
        console.warn('getSession failed', error.message);
      }

      setSession(data.session ?? null);
      await hydrateProfile(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: authSubscription } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      await hydrateProfile(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, [hydrateProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn('signOut failed', error.message);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const redirectTo = Linking.createURL('/reset-password');
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    return { error: error?.message ?? null };
  }, []);

  const refreshProfile = useCallback(async () => {
    const user = session?.user ?? null;
    await hydrateProfile(user);
  }, [hydrateProfile, session?.user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      profile,
      signIn,
      signOut,
      resetPassword,
      refreshProfile,
    }),
    [loading, profile, refreshProfile, resetPassword, session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
