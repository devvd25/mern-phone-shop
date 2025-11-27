# Script dừng tất cả services

Write-Host "🛑 Stopping MERN Phone Shop..." -ForegroundColor Red

# Dừng tất cả process Node.js
Write-Host "`n⚙️ Stopping Node.js processes..." -ForegroundColor Cyan
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

Write-Host "✅ All services stopped!" -ForegroundColor Green
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
