$ErrorActionPreference = 'Stop'
$sdkLocal = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$adb = $null

# Resolve adb from PATH first, then fall back to LOCALAPPDATA.
if (Get-Command adb -ErrorAction SilentlyContinue) {
  $adb = "adb"
} else {
  $adb = Join-Path $sdkLocal "platform-tools\adb.exe"
  if (-not (Test-Path $adb) -and $adb -ne "adb") {
    Write-Error "adb.exe not found. Install Android SDK Platform Tools or add platform-tools to PATH. Expected: $adb"
    exit 1
  }
}

# Check emulator state and restart if missing/offline.
$devices = & $adb devices
$emuLines = $devices | Select-String '^\s*emulator-\d+\s+' | ForEach-Object { $_.Line }
$needRestart = $false
if (-not $emuLines -or $emuLines.Count -eq 0) {
  $needRestart = $true
} else {
  foreach ($line in $emuLines) {
    if ($line -match '\s+offline\s*$') {
      $needRestart = $true
      break
    }
  }
}

if ($needRestart) {
  Write-Host "Emulator not ready (offline/missing). Running android:restart..."
  & powershell -NoProfile -ExecutionPolicy Bypass -File scripts/restart-android-dev.ps1
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
}

# Pin dev host/port and launch Tauri Android dev.
$env:TAURI_DEV_HOST = "192.168.0.205"
$env:TAURI_DEV_PORT = "5173"

& tauri android dev
exit $LASTEXITCODE
