import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/contexts/AuthContext';

export default function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      setError('Enter your account email.');
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    const result = await resetPassword(email.trim());
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setStatus('Password reset email sent. Open the link on this device to continue.');
  };

  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <View className="flex-1 justify-center px-6">
        <View className="rounded-3xl border border-amber-200 bg-white p-6">
          <Text className="text-2xl font-bold text-amber-900">Reset Password</Text>
          <Text className="mt-2 text-sm text-amber-700">We will send a secure reset link to your email.</Text>

          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base"
            placeholder="Email"
            placeholderTextColor="#a16207"
            value={email}
            onChangeText={setEmail}
          />

          {error ? <Text className="mt-3 text-sm text-rose-600">{error}</Text> : null}
          {status ? <Text className="mt-3 text-sm text-emerald-700">{status}</Text> : null}

          <Pressable className="mt-5 rounded-xl bg-amber-700 px-4 py-3" onPress={handleSend} disabled={loading}>
            <Text className="text-center text-base font-semibold text-white">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
