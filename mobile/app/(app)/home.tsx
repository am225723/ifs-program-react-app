import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { homeLinks } from '../../src/constants/navLinks';
import { useAuth } from '../../src/contexts/AuthContext';
import { ScreenShell } from '../../src/components/ScreenShell';

export default function HomeScreen() {
  const { profile, signOut, user } = useAuth();

  return (
    <ScreenShell
      title="Internal Family Systems"
      subtitle="Mobile migration foundation is active. Core auth + navigation is now running in React Native."
    >
      <View className="mb-4 rounded-2xl border border-amber-200 bg-white p-4">
        <Text className="text-sm text-amber-700">Signed in as</Text>
        <Text className="mt-1 text-base font-semibold text-amber-900">{profile?.name || user?.email || 'User'}</Text>
        <Text className="mt-1 text-xs uppercase tracking-wide text-amber-700">Role: {profile?.user_role || 'client'}</Text>
      </View>

      <View className="mb-4 flex-row flex-wrap gap-3">
        {homeLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href as never}
            className="min-w-[45%] rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-center text-sm font-semibold text-emerald-700"
          >
            {item.label}
          </Link>
        ))}
      </View>

      <Pressable className="rounded-xl bg-amber-700 px-4 py-3" onPress={signOut}>
        <Text className="text-center text-base font-semibold text-white">Sign Out</Text>
      </Pressable>
    </ScreenShell>
  );
}
