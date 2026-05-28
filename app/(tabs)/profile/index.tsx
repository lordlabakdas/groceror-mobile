// app/(tabs)/profile/index.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../../lib/auth-context";
import { LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <View className="flex-1 bg-background px-6 pt-16">
      <Text className="text-primary text-2xl font-bold mb-1">groceror</Text>
      <Text className="text-muted-foreground mb-8">Your account</Text>

      <View className="bg-card border border-border rounded-xl p-4 mb-4">
        <Text className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
          Phone
        </Text>
        <Text className="text-foreground text-base font-semibold">
          {user.phone}
        </Text>
      </View>

      <View className="bg-card border border-border rounded-xl p-4 mb-8">
        <Text className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
          Account type
        </Text>
        <Text className="text-foreground text-base font-semibold capitalize">
          {user.entityType}
        </Text>
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center border border-destructive/40 rounded-xl py-3 gap-2"
        onPress={logout}
      >
        <LogOut size={18} color="#dc2626" />
        <Text className="text-destructive font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
