# groceror mobile

React Native app for groceror — fresh groceries, delivered fast.

Built with Expo (SDK 54), expo-router, NativeWind, and TanStack Query.

## Prerequisites

- Node.js (see `.nvmrc`)
- [Expo Go](https://expo.dev/go) on your device, or an iOS simulator / Android emulator
- A running instance of the groceror backend API

## Getting started

```bash
cp .env.example .env        # set EXPO_PUBLIC_API_URL to your backend
npm install
npm start                   # opens Expo dev server
```

Scan the QR code with Expo Go, or press `i` / `a` to open a simulator.

## Auth flow

1. **Phone screen** — enter phone + password to log in, or enter phone and tap "Register" to start sign-up
2. **OTP screen** — verify the one-time code sent to the phone number
3. **Register screen** — choose a name and password to create the account

On successful login the JWT is stored in the device's secure store. `AuthGuard` (root layout) automatically redirects between the `(auth)` and `(tabs)` route groups based on token presence.

## Tab screens

| Tab | Status |
|-----|--------|
| Browse | Placeholder (Sub-project 2) |
| Search | Placeholder |
| Cart | Placeholder |
| Orders | Placeholder |
| Profile | Placeholder |

## Running tests

```bash
npm test                              # all tests
npx jest __tests__/api.test.ts        # single file
npm run test:watch
```

Tests cover `lib/api.ts`, `lib/auth-context.tsx`, and `lib/secure-store.ts`.
