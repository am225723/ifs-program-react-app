import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/contexts/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <View className="flex-1 justify-center px-6">
        <View className="rounded-3xl border border-amber-200 bg-white p-6">
          <Text className="text-3xl font-bold text-amber-900">IFS App</Text>
          <Text className="mt-2 text-sm text-amber-700">Sign in with your account to continue.</Text>

          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base"
            placeholder="Email"
            placeholderTextColor="#a16207"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            secureTextEntry
            className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base"
            placeholder="Password"
            placeholderTextColor="#a16207"
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text className="mt-3 text-sm text-rose-600">{error}</Text> : null}

          <Pressable
            className="mt-5 rounded-xl bg-amber-700 px-4 py-3"
            onPress={onSubmit}
            disabled={loading}
          >
            <Text className="text-center text-base font-semibold text-white">
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </Pressable>

          <Link href="/(auth)/reset-password" className="mt-4 text-center text-sm font-semibold text-amber-700">
            Forgot password?
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
