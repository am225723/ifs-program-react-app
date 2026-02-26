import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';

export default function AppLayout() {
  const { loading, session } = useAuth();

  if (!loading && !session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fef3c7' },
        headerTintColor: '#92400e',
        contentStyle: { backgroundColor: '#fffbeb' },
      }}
    >
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="curriculum" options={{ title: 'Curriculum' }} />
      <Stack.Screen name="assessments" options={{ title: 'Assessments' }} />
      <Stack.Screen name="journal" options={{ title: 'Journal' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
