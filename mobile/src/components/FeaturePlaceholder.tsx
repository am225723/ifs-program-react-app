import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { ScreenShell } from './ScreenShell';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  therapistOnly?: boolean;
}

export function FeaturePlaceholder({ title, description, therapistOnly = false }: FeaturePlaceholderProps) {
  const { profile } = useAuth();
  const role = profile?.user_role ?? 'client';
  const hasTherapistAccess = role === 'therapist' || role === 'admin';

  if (therapistOnly && !hasTherapistAccess) {
    return (
      <ScreenShell title={title} subtitle="Restricted Access">
        <View className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <Text className="text-base font-semibold text-rose-700">Therapist access required</Text>
          <Text className="mt-2 text-sm text-rose-600">
            This screen is available only to therapist/admin accounts in the mobile app.
          </Text>
          <Link href="/(app)/home" className="mt-4 text-sm font-semibold text-amber-700">
            Back to Home
          </Link>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell title={title} subtitle="React Native migration in progress">
      <View className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <Text className="text-base font-semibold text-emerald-700">Feature mapped for mobile</Text>
        <Text className="mt-2 text-sm text-emerald-700">{description}</Text>
      </View>
    </ScreenShell>
  );
}
