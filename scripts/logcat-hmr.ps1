$adbCommand = Get-Command adb -ErrorAction SilentlyContinue
$adbPath = if ($adbCommand) { $adbCommand.Source } else { $null }

if (-not $adbPath) {
  $candidatePaths = @()
  if ($env:ANDROID_SDK_ROOT) {
    $candidatePaths += Join-Path $env:ANDROID_SDK_ROOT 'platform-tools\adb.exe'
  }
  if ($env:ANDROID_HOME) {
    $candidatePaths += Join-Path $env:ANDROID_HOME 'platform-tools\adb.exe'
  }
  if ($env:LOCALAPPDATA) {
    $candidatePaths += Join-Path $env:LOCALAPPDATA 'Android\Sdk\platform-tools\adb.exe'
  }

  foreach ($candidate in $candidatePaths) {
    if ($candidate -and (Test-Path $candidate)) {
      $adbPath = $candidate
      break
    }
  }
}

if (-not $adbPath) {
  $attempted = @(
    $(if ($env:ANDROID_SDK_ROOT) { Join-Path $env:ANDROID_SDK_ROOT 'platform-tools\adb.exe' } else { '$env:ANDROID_SDK_ROOT\\platform-tools\\adb.exe (env not set)' }),
    $(if ($env:ANDROID_HOME) { Join-Path $env:ANDROID_HOME 'platform-tools\adb.exe' } else { '$env:ANDROID_HOME\\platform-tools\\adb.exe (env not set)' }),
    $(if ($env:LOCALAPPDATA) { Join-Path $env:LOCALAPPDATA 'Android\\Sdk\\platform-tools\\adb.exe' } else { '$env:LOCALAPPDATA\\Android\\Sdk\\platform-tools\\adb.exe (env not set)' })
  ) -join '; '
  Write-Error "adb not found. Tried PATH and these locations: $attempted. Install Android Platform Tools or add platform-tools to PATH."
  exit 1
}

$pattern = 'HMR DEBUG|server connection lost|@vite/ws|WebSocket|vite'

& $adbPath logcat -c | Out-Null
Write-Host "[logcat-hmr] Filtering for: $pattern"
& $adbPath logcat | Select-String -Pattern $pattern | ForEach-Object { $_.Line }
