#!/bin/bash

echo "🚀 Setting up Todo App Stage 3B..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Convex URL"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📚 Next steps:"
echo "1. Run: npx convex dev"
echo "2. Copy your Convex deployment URL"
echo "3. Update EXPO_PUBLIC_CONVEX_URL in .env file"
echo "4. Run: npm start"
echo ""
echo "📖 For detailed instructions, see README.md"
echo ""
echo "✨ Setup complete!"
