@echo off
echo 🚀 Starting Objectify Application...
echo.

echo 📋 Checking if .env file exists...
if not exist "backend\.env" (
    echo ❌ Backend .env file not found!
    echo Please create backend\.env file with your configuration.
    echo See IMPLEMENTATION_GUIDE.md for details.
    pause
    exit /b 1
)

echo ✅ Backend .env file found
echo.

echo 🖥️  Starting Backend Server...
start "Objectify Backend" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo 🌐 Starting Frontend Server...
start "Objectify Frontend" cmd /k "npm run dev"

echo.
echo 🎉 Both servers are starting!
echo.
echo 📱 Frontend: http://localhost:3001
echo 🔧 Backend: http://localhost:5000
echo 💚 Health Check: http://localhost:5000/health
echo.
echo Press any key to exit this window...
pause > nul
