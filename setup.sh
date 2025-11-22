#!/bin/bash

# ===============================
# BRIXA Setup Script
# ===============================

echo "🚀 Starting BRIXA Setup..."

# Function to check command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# -------------------------------
# 1. Check Node.js
# -------------------------------
if command_exists node; then
    echo "✅ Node.js is already installed: $(node -v)"
else
    echo "⚠️ Node.js is not installed. Installing Node.js..."
    # Using Node Version Manager (nvm) for safety
    if ! command_exists curl; then
        echo "❌ curl not found. Please install curl to proceed."
        exit 1
    fi
    curl -fsSL https://fnm.vercel.app/install | bash
    export PATH="$HOME/.fnm:$PATH"
    eval "$(fnm env)"
    fnm install 18
    fnm default 18
    echo "✅ Node.js installed: $(node -v)"
fi

# -------------------------------
# 2. Check pnpm
# -------------------------------
if command_exists pnpm; then
    echo "✅ pnpm is already installed: $(pnpm -v)"
else
    echo "⚠️ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed: $(pnpm -v)"
fi

# -------------------------------
# 3. Check Turbo
# -------------------------------
if command_exists turbo; then
    echo "✅ Turbo is already installed: $(turbo -v)"
else
    echo "⚠️ Turbo CLI not found. Installing turbo..."
    npm install -g turbo
    echo "✅ Turbo installed: $(turbo -v)"
fi

# -------------------------------
# 4. Install dependencies
# -------------------------------
echo "📦 Installing project dependencies with pnpm..."
pnpm install

# -------------------------------
# 5. Start development servers
# -------------------------------
echo "🏃 Starting BRIXA in development mode..."
pnpm dev

echo "🎉 BRIXA setup complete! Your apps should now be running."
