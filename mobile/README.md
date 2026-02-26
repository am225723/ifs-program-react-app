# IFS App Mobile (Expo)

This directory contains the React Native mobile app migration for iOS and Android store delivery.

## Run locally

```bash
cp .env.example .env
npm install
npm run start
```

## Environment variables

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Build and submit

```bash
npx eas build --platform ios --profile preview
npx eas build --platform android --profile preview
npx eas submit --platform ios --profile production
npx eas submit --platform android --profile production
```

## Notes

- Auth model: Supabase Auth email/password
- App profile table: `ifs_clients` linked via `auth_user_id`
- Route parity scaffold includes all current web routes and role-gated therapist/admin screens
