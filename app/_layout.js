import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false, title: '', }} />
      </SafeAreaView>
    </AuthProvider>
  );
}