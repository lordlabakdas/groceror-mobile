// app.config.ts
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "groceror",
  slug: "groceror-mobile",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    backgroundColor: "#1a2e1a",
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.groceror.mobile",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#1a2e1a",
    },
    package: "com.groceror.mobile",
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "groceror uses your location to show nearby stores.",
      },
    ],
  ],
  scheme: "groceror",
});
