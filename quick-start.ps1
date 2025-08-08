Write-Host "🚀 Starting Objectify Application..." -ForegroundColor Green
Write-Host ""

# Check if .env file exists
Write-Host "📋 Checking if .env file exists..." -ForegroundColor Yellow
if (-not (Test-Path "backend\.env")) {
    Write-Host "❌ Backend .env file not found!" -ForegroundColor Red
    Write-Host "Please create backend\.env file with your configuration." -ForegroundColor Yellow
    Write-Host "See IMPLEMENTATION_GUIDE.md for details." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Backend .env file found" -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "🖥️  Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal

# Wait a moment
Write-Host "⏳ Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "🎉 Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3001" -ForegroundColor White
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor White
Write-Host "💚 Health Check: http://localhost:5000/health" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
