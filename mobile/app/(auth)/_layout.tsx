import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';

export default function AuthLayout() {
  const { loading, session } = useAuth();

  if (!loading && session) {
    return <Redirect href="/(app)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#fef3c7' },
        headerTintColor: '#92400e',
      }}
    >
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
      <Stack.Screen name="sso/callback" options={{ title: 'SSO Callback' }} />
    </Stack>
  );
}
