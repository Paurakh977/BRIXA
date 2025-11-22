# ===============================
# BRIXA Windows Setup Script
# ===============================
# Run this in PowerShell (as normal user)
# ===============================

Write-Host "Starting BRIXA Setup..." -ForegroundColor Cyan

# Function to check if a command exists
function Command-Exists {
    param([string]$cmd)
    $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

# -------------------------------
# 1. Check Node.js
# -------------------------------
if (Command-Exists "node") {
    Write-Host "Node.js is already installed: $(node -v)" -ForegroundColor Green
} else {
    Write-Host "Node.js not found. Installing Node.js..." -ForegroundColor Yellow
    if (Command-Exists "winget") {
        winget install OpenJS.NodeJS.LTS -h
    } else {
        Write-Host "Please install Node.js manually: https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
}

# -------------------------------
# 2. Check pnpm
# -------------------------------
if (Command-Exists "pnpm") {
    Write-Host "pnpm is already installed: $(pnpm -v)" -ForegroundColor Green
} else {
    Write-Host "pnpm not found. Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
    Write-Host "pnpm installed: $(pnpm -v)" -ForegroundColor Green
}

# -------------------------------
# 3. Check Turbo
# -------------------------------
if (Command-Exists "turbo") {
    Write-Host "Turbo CLI is already installed: $(turbo -v)" -ForegroundColor Green
} else {
    Write-Host "Turbo CLI not found. Installing turbo..." -ForegroundColor Yellow
    npm install -g turbo
    Write-Host "Turbo installed: $(turbo -v)" -ForegroundColor Green
}

# -------------------------------
# 4. Install project dependencies
# -------------------------------
Write-Host "Installing project dependencies with pnpm..." -ForegroundColor Cyan
pnpm install

# -------------------------------
# 5. Start development servers
# -------------------------------
Write-Host "Starting BRIXA in development mode..." -ForegroundColor Cyan
pnpm dev

Write-Host "BRIXA setup complete! Your apps should now be running." -ForegroundColor Green
