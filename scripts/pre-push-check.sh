#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🔍 Running Vercel-compatible build check to catch type errors..."
echo "📝 This simulates what happens on Vercel and catches errors early"

# Run the vercel-check
pnpm vercel-check

# If we get here, all checks passed
echo "✅ All checks passed! Your code is ready for Vercel deployment." 