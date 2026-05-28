// app/(auth)/otp.tsx
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
import { router, useLocalSearchParams } from "expo-router";
import { apiRequest } from "../../lib/api";

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleVerify() {
    if (otp.length < 4) return;
    setLoading(true);
    setError(null);
    try {
      await apiRequest("POST", "/user/verify-otp", { phone, otp });
      router.push({ pathname: "/(auth)/register", params: { phone } });
    } catch (e: any) {
      setError("Invalid or expired OTP");
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
        <Text className="text-foreground text-2xl font-bold mb-2">
          Enter OTP
        </Text>
        <Text className="text-muted-foreground mb-8">
          Sent to {phone}
        </Text>

        <TextInput
          className="bg-input border border-border text-foreground rounded-lg px-4 py-3 mb-4 text-center text-2xl tracking-[0.5em]"
          placeholder="------"
          placeholderTextColor="#3d6b3d"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          autoFocus
        />

        {error && (
          <Text className="text-destructive mb-4 text-sm">{error}</Text>
        )}

        <TouchableOpacity
          className="bg-primary rounded-lg py-3 items-center mb-3"
          onPress={handleVerify}
          disabled={loading || otp.length < 4}
        >
          {loading ? (
            <ActivityIndicator color="#0f1f0f" />
          ) : (
            <Text className="text-primary-foreground font-semibold text-base">
              Verify
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => router.back()}>
          <Text className="text-muted-foreground">← Change number</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
