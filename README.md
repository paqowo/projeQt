# Terragramy – Karta dne

## Requirements
- Node.js
- npm

## Scripts
- `npm install`
- `npm run dev`
- `npm run android:dev` (use this exact command)
- `npm run android:logcat:hmr`
- `npm run android:logcat:hmr:all`
- `npm run build`

## VS Code quickstart
1) `npm run android:restart`
2) `npm run android:dev`

Good output looks like:
```
adb devices:
emulator-5554    device
```

`npm run android:dev` now auto-restarts the emulator if it is offline or missing.

## Android HMR logcat
Krok 1: `npm run android:dev` (v jednom terminalu)
Krok 2: `npm run android:logcat:hmr` (v druhém terminalu)

Co očekávat v logu:
- `[HMR DEBUG] WebSocket connect -> ws://<host>:5173/@vite/ws`
- `[HMR DEBUG] WebSocket OPEN`

Když se objeví `ws://tauri.localhost/@vite/ws`, znamená to, že HMR jde na špatný host a Android WebView se k Vite serveru nepřipojí.
Když vidíš `CLOSE 1006`, WebSocket spadl bez správného ukončení (obvykle špatný host/port nebo síťové spojení).

## Android HMR host
If you have multiple network adapters (VPN, virtual adapters), set `TAURI_DEV_HOST` to the LAN IP your Android device can reach.
Example (PowerShell): `$env:TAURI_DEV_HOST="192.168.0.205"; $env:TAURI_DEV_PORT="5173"; npm run android:dev`

Verify in logcat:
- `[HMR DEBUG] WebSocket connect -> ws://192.168.0.205:5173/@vite/ws`
- `[HMR DEBUG] WebSocket OPEN`
- `[vite] server connection lost` should stop appearing

## Assets
- `public/logo.webp`
- `public/favicon.ico`
- `public/symbols/<slug>.webp` (one file per card slug)
