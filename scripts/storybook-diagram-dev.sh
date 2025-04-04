#!/bin/bash

# Storybook Diagram Development Script
# This script starts Storybook in a mode optimized for diagram development

echo "🚀 Starting Storybook in diagram development mode..."
echo "🎨 Navigate to the AiIntegrationProcessDiagram story for efficient diagram development"
echo "📝 Changes to diagram files will auto-reload in Storybook"

# Kill any existing storybook process
if lsof -ti:6006 >/dev/null; then
  echo "🔄 Closing existing Storybook server..."
  kill -9 $(lsof -ti:6006)
fi

# Navigate to the root directory
cd "$(dirname "$0")/.."

# Start storybook with focus on diagrams
pnpm storybook --no-open --port 6006 --no-version-updates 