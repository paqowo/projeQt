import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { networkInterfaces } from 'node:os'

const getFirstNonInternalIPv4 = (): string | undefined => {
  const nets = networkInterfaces()
  for (const net of Object.values(nets)) {
    for (const addr of net ?? []) {
      // Node types: addr.family is "IPv4" | "IPv6" (string) -> do NOT compare to number 4
      if (addr.family === 'IPv4' && !addr.internal) return addr.address
    }
  }
  return undefined
}

const tauriDevHost = process.env.TAURI_DEV_HOST
const localIp = getFirstNonInternalIPv4()

// Never localhost for Android WebView HMR
const hmrHost = tauriDevHost ?? '192.168.0.205'

// For browser/desktop we can keep origin resolvable; for Android we want LAN IP
const originHost = tauriDevHost ?? localIp ?? 'localhost'
const origin = `http://${originHost}:5173`

if (!tauriDevHost) {
  if (localIp) {
    console.warn(`[vite] TAURI_DEV_HOST is not set. Using ${localIp} for HMR host.`)
  } else {
    console.warn(
      '[vite] TAURI_DEV_HOST is not set and no LAN IPv4 detected. Using 0.0.0.0 for HMR host.',
    )
  }
}

console.log(`[vite] HMR host = ${hmrHost} | origin = ${origin}`)
console.log(`[vite] Expected HMR websocket = ws://${hmrHost}:5173/@vite/ws`)

const config = {
  plugins: [react()],
  base: '/projeQt/',
  clearScreen: false,
  envPrefix: ['VITE_', 'TAURI_'],
  define: {
    __TAURI_DEV_HOST__: JSON.stringify(process.env.TAURI_DEV_HOST ?? ''),
    __TAURI_DEV_PORT__: JSON.stringify(process.env.TAURI_DEV_PORT ?? '5173'),
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin,

    hmr: {
      protocol: 'ws',
      host: hmrHost,
      port: 5173,
      clientPort: 5173,
      path: '/@vite/ws',
      timeout: 30000,
      overlay: true,
    },
  },

  build: {
    target: 'es2021',
    // Vite-accepted: false | "esbuild" | "terser"
    minify: process.env.TAURI_DEBUG ? false : 'esbuild',
    sourcemap: !!process.env.TAURI_DEBUG,
  },
} satisfies UserConfig

export default defineConfig(config)
