// app/(auth)/register.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { apiRequest } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

export default function RegisterScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    if (!name.trim() || !password || password !== confirm) {
      setError(
        password !== confirm ? "Passwords do not match" : "All fields required",
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiRequest("POST", "/user/register", {
        phone,
        name,
        password,
        entity_type: "user",
      });
      const loginRes = await apiRequest("POST", "/user/login", {
        phone,
        password,
      });
      const data = await loginRes.json();
      await login(data.access_token);
      // AuthGuard handles the redirect once user state updates
    } catch (e: any) {
      setError(e.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="px-6"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-foreground text-2xl font-bold mb-2">
          Create account
        </Text>
        <Text className="text-muted-foreground mb-8">{phone}</Text>

        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-3"
          placeholder="Your name"
          placeholderTextColor="#6b9e6b"
          autoComplete="name"
          value={name}
          onChangeText={setName}
          autoFocus
        />
        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-3"
          placeholder="Password"
          placeholderTextColor="#6b9e6b"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-4"
          placeholder="Confirm password"
          placeholderTextColor="#6b9e6b"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        {error && (
          <Text className="text-destructive mb-4 text-sm">{error}</Text>
        )}

        <TouchableOpacity
          className="bg-primary rounded-lg py-3 items-center"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0f1f0f" />
          ) : (
            <Text className="text-primary-foreground font-semibold text-base">
              Create Account
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
