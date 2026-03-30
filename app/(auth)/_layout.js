import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🔥 ini yang menghilangkan (auth)
      }}
    />
  );
}