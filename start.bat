@echo off
echo ========================================
   Woreda 4 Barber - Starting...
echo ========================================
echo.

echo [1/2] Starting upload server (port 3001)...
start "Upload Server" cmd /c "node server.js"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Vite dev server (port 5173)...
start "Vite Dev Server" cmd /c "npm run dev:vite"

echo.
echo ========================================
echo   Upload Server : http://localhost:3001
echo   Dev Server    : http://localhost:5173
echo ========================================
echo.
echo Close this window or press Ctrl+C to stop.
pause
