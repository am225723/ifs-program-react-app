import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SSOCallbackScreen() {
  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <View className="flex-1 items-center justify-center px-6">
        <View className="rounded-2xl border border-amber-200 bg-white p-5">
          <Text className="text-lg font-semibold text-amber-900">SSO Callback</Text>
          <Text className="mt-2 text-sm text-amber-700">
            SSO token callback handling will be migrated to a secure mobile deep-link flow in the next phase.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
