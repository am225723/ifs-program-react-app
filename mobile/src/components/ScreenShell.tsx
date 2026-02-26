import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';

interface ScreenShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ScreenShell({ title, subtitle, children }: ScreenShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        <View className="mb-4 rounded-2xl border border-amber-200 bg-white p-4">
          <Text className="text-2xl font-bold text-amber-900">{title}</Text>
          {subtitle ? <Text className="mt-1 text-sm text-amber-700">{subtitle}</Text> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
