import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#0b1020' },
        headerTintColor: '#f8fafc',
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Arrasta pra baixo ⚠️",
          }}
        />
      </Stack>
    </>
  );
}
