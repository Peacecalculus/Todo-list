@echo off
echo ========================================
echo    Todo App Stage 3B - Quick Setup
echo ========================================
echo.

echo Step 1: Setting up Convex...
echo Run: npx convex login
echo Then: npx convex dev
echo.
echo Copy the Convex URL it gives you!
echo.

pause

echo.
echo Step 2: Update .env file
echo Open .env and paste your Convex URL
echo.

pause

echo.
echo Step 3: Installing dependencies...
call npm install
echo.

echo.
echo Step 4: Starting the app...
echo Run: npm start
echo.
echo Then:
echo - Scan QR code with Expo Go app
echo - Press 'a' for Android
echo - Press 'i' for iOS
echo.

echo ========================================
echo           Setup Complete!
echo ========================================
echo.
echo Next: Read START_HERE_FIRST.md
echo.

pause
