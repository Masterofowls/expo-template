Expo Android template

This is a minimal reusable Expo template (TypeScript) focused on producing an Android APK via EAS.

Features included:
- app.json with Android permissions (READ_CONTACTS, GET_ACCOUNTS)
- eas.json build profiles for managed APK builds
- PowerShell script to generate an Android keystore
- biome configuration for lint/format
- tsconfig, babel config
- simple App.tsx that requests contacts permission and shows a best-effort device name

How to use:
1. cd apps/expo-template
2. npm install
3. npx expo start (or: npm run prebuild && npm run android) — or use EAS: npm run build:android
4. To generate a keystore: ./scripts/generate-keystore.ps1 -OutPath android\keystore.jks

Web support:
- Start web: npm run web  OR npm run start:web  (runs the project in the browser via react-native-web)

Android emulator helper:
- Start the default AVD: .\scripts\start-emulator.ps1
- Start a specific AVD: .\scripts\start-emulator.ps1 -AvdName "Pixel_5_API_30"
- After emulator boots run: npx expo start and press 'a' to open app in emulator (Expo Go must be installed on the emulator)

Notes:
- The app reads contacts as a best-effort source for a "username". For a native Android AccountManager-based approach, add a native module and set GET_ACCOUNTS at AndroidManifest level.
