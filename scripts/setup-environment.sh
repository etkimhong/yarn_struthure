#!/bin/bash

# Ensure NVM is installed
if [ ! -d "$HOME/.nvm" ]; then
    echo "NVM is not installed. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
    echo "NVM is already installed."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi
# Load NVM
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# Install Node.js v20 if not already installed
nvm install 20
nvm use 20
nvm alias default 20
# Install Yarn and PM2 globally if they are not installed
if ! command -v yarn &> /dev/null; then
    echo "Yarn is not installed. Installing Yarn..."
    npm install -g yarn
else
    echo "Yarn is already installed."
fi

if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2
else
    echo "PM2 is already installed."
fi
# Display versions to verify installations
echo "Node.js version: $(node -v)"
echo "PM2 version: $(pm2 -v)"
echo "Yarn version: $(yarn -v)"
