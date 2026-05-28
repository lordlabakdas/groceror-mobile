// app/(auth)/phone.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { apiRequest } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

export default function PhoneScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!phone.trim() || !password.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest("POST", "/user/login", { phone, password });
      const data = await res.json();
      await login(data.access_token);
      router.replace("/(tabs)/browse");
    } catch (e: any) {
      setError("Invalid phone or password");
    } finally {
      setLoading(false);
    }
  }

  async function handleStartRegister() {
    if (!phone.trim()) {
      setError("Enter your phone number first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiRequest("POST", "/user/send-otp", { phone });
      router.push({ pathname: "/(auth)/otp", params: { phone } });
    } catch (e: any) {
      setError(e.message ?? "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 justify-center px-6">
        <Text className="text-primary text-3xl font-bold mb-1">groceror</Text>
        <Text className="text-muted-foreground mb-8">
          Fresh groceries, delivered fast
        </Text>

        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-3"
          placeholder="Phone number"
          placeholderTextColor="#6b9e6b"
          keyboardType="phone-pad"
          autoComplete="tel"
          value={phone}
          onChangeText={setPhone}
          autoFocus
        />
        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-4"
          placeholder="Password"
          placeholderTextColor="#6b9e6b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && (
          <Text className="text-destructive mb-4 text-sm">{error}</Text>
        )}

        <TouchableOpacity
          className="bg-primary rounded-lg py-3 items-center mb-3"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f1f0f" />
          ) : (
            <Text className="text-primary-foreground font-semibold text-base">
              Log In
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-border rounded-lg py-3 items-center"
          onPress={handleStartRegister}
          disabled={loading}
        >
          <Text className="text-muted-foreground text-base">
            New here? Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
