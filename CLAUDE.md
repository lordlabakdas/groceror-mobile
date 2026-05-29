# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server
npm start                        # Expo dev server (scan QR for device)
npm run android                  # Android emulator
npm run ios                      # iOS simulator
npm run web                      # Web browser

# Tests
npm test                         # Run all tests
npm run test:watch               # Watch mode
npx jest __tests__/api.test.ts   # Run a single test file
```

## Environment

Copy `.env.example` to `.env` before running. The only variable is:
```
EXPO_PUBLIC_API_URL=http://localhost:8000
```

## Architecture

**Routing** — expo-router (file-based). `app/` maps directly to routes:
- `app/_layout.tsx` — root layout; wraps everything in `QueryClientProvider > AuthProvider > AuthGuard > Stack`
- `app/index.tsx` — entry redirect
- `app/(auth)/` — unauthenticated screens: `phone.tsx` → `otp.tsx` → `register.tsx`
- `app/(tabs)/` — authenticated tab screens: browse, search, cart, orders, profile

**Auth guard** — `AuthGuard` in `app/_layout.tsx` watches `useAuth()` and `useSegments()`. When `ready` (token load complete): unauthenticated users outside `(auth)` are pushed to `/(auth)/phone`; authenticated users inside `(auth)` are pushed to `/(tabs)/browse`.

**Auth state** (`lib/auth-context.tsx`) — JWT is persisted in `expo-secure-store` via `lib/secure-store.ts`. On mount, `AuthProvider` reads the stored token, decodes it into `CurrentUser`, and exposes `{ user, ready, login, logout, openLogin }` via `useAuth()`.

**API layer** (`lib/api.ts`) — two exports:
- `apiRequest(method, url, data?)` — raw fetch wrapper; auto-attaches `Authorization: Bearer <token>` and throws on non-2xx.
- `queryFn<T>({ queryKey })` — TanStack Query compatible; uses `queryKey[0]` as the URL path. Returns `null` on 401 (unauthenticated) instead of throwing.

Base URL comes from `Constants.expoConfig.extra.apiUrl` (set by `app.config.ts` from `EXPO_PUBLIC_API_URL`).

**Styling** — NativeWind v4 (Tailwind CSS for React Native). Entry CSS is `global.css`; config is `tailwind.config.js`. Use Tailwind class names via the `className` prop.

## Build config notes

- `babel-preset-nativewind.js` is a local wrapper around `nativewind/babel` that avoids pulling in `react-native-worklets/plugin` (only needed for Reanimated 4, not resolvable in Metro's transform worker). The NativeWind babel preset is excluded in test env (`NODE_ENV=test`).
- `metro.config.js` wraps the default Expo config with `withNativeWind`.
- Tests use `jest-expo` preset. `transformIgnorePatterns` in `jest.config.js` is extended to include `nativewind` and `tailwindcss`.
