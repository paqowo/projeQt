import { execSync } from 'node:child_process'
import { platform } from 'node:os'

const portArg = process.argv[2]
const port = portArg ? Number(portArg) : 5173

if (!Number.isInteger(port) || port <= 0) {
  console.error(`[kill-port] Invalid port: ${portArg ?? ''}`)
  process.exit(1)
}

const isWindows = platform() === 'win32'

const unique = (arr) => [...new Set(arr)]

const killPids = (pids) => {
  if (pids.length === 0) {
    console.log(`[kill-port] No process is listening on port ${port}.`)
    return
  }

  for (const pid of pids) {
    try {
      if (isWindows) {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
      } else {
        execSync(`kill -9 ${pid}`, { stdio: 'ignore' })
      }
      console.log(`[kill-port] Killed PID ${pid} on port ${port}.`)
    } catch (err) {
      console.warn(`[kill-port] Failed to kill PID ${pid}: ${err.message}`)
    }
  }
}

try {
  if (isWindows) {
    const output = execSync('netstat -ano -p tcp', { encoding: 'utf8' })
    const pids = unique(
      output
        .split(/\r?\n/)
        .filter((line) => line.includes('LISTENING') && line.includes(`:${port}`))
        .map((line) => line.trim().split(/\s+/))
        .filter((parts) => parts.length >= 5)
        .map((parts) => parts[4])
        .filter((pid) => pid && pid !== '0'),
    )
    killPids(pids)
  } else {
    let output = ''
    try {
      output = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8' })
    } catch {
      output = ''
    }
    const pids = unique(
      output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    )
    killPids(pids)
  }
} catch (err) {
  console.warn(`[kill-port] Failed to check port ${port}: ${err.message}`)
  process.exit(0)
}
