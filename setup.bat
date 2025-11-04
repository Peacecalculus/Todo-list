@echo off
echo 🚀 Setting up Todo App Stage 3B...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js is installed
node -v
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

REM Check if .env file exists
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update .env with your Convex URL
) else (
    echo ✅ .env file already exists
)

echo.
echo 📚 Next steps:
echo 1. Run: npx convex dev
echo 2. Copy your Convex deployment URL
echo 3. Update EXPO_PUBLIC_CONVEX_URL in .env file
echo 4. Run: npm start
echo.
echo 📖 For detailed instructions, see README.md
echo.
echo ✨ Setup complete!
pause
