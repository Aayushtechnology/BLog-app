#!/bin/bash

echo "Installing Blog App Dependencies..."
echo ""

echo "📦 Installing frontend dependencies..."
npm install

echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure backend/.env file with your MongoDB URL and email settings"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: npm run dev"
echo ""
echo "📖 See SETUP.md for detailed instructions"
