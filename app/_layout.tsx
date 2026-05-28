import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "../lib/auth-context";
import { queryClient } from "../lib/query-client";
import "../global.css";

// Force dark mode — app is dark-only, matching the web app palette.
StyleSheet.setFlag("darkMode", "class");

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!ready) return;
    const inAuth = segments[0] === "(auth)";
    if (!user && !inAuth) {
      router.replace("/(auth)/phone");
    } else if (user && inAuth) {
      router.replace("/(tabs)/browse");
    }
  }, [user, ready, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
