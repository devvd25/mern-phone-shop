# Script khởi động dự án MERN Phone Shop

Write-Host "🚀 Starting MERN Phone Shop..." -ForegroundColor Green

# Kiểm tra MongoDB
Write-Host "`n📊 Checking MongoDB..." -ForegroundColor Cyan
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($mongoService) {
    if ($mongoService.Status -eq "Running") {
        Write-Host "✅ MongoDB is already running" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Starting MongoDB service..." -ForegroundColor Yellow
        Start-Service -Name "MongoDB"
        Start-Sleep -Seconds 2
    }
} else {
    Write-Host "⚠️ MongoDB service not found. Please start MongoDB Compass manually." -ForegroundColor Yellow
    Write-Host "Press any key to continue after starting MongoDB..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Khởi động Backend Server
Write-Host "`n⚙️ Starting Backend Server (port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm run dev"
Start-Sleep -Seconds 3

# Khởi động Frontend Client
Write-Host "`n🎨 Starting Frontend Client (port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev"

Write-Host "`n✅ All services started!" -ForegroundColor Green
Write-Host "`n📱 Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "⚙️ Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
