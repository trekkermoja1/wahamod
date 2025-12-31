#!/bin/bash

# WAHA MOD - GitHub Push Script
# This script helps you push the repository to GitHub

set -e

echo "🚀 WAHA MOD - Push to GitHub"
echo "==============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}❌ Error: Not a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
    git status --short
    echo ""
fi

# Show current commits
echo -e "${BLUE}📦 Repository Status:${NC}"
echo ""
echo "Current commits:"
git log --oneline -5
echo ""

# Get GitHub username
echo -e "${GREEN}Step 1: GitHub Repository Setup${NC}"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Error: GitHub username is required${NC}"
    exit 1
fi

REPO_NAME="wahamod"
GITHUB_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""
echo -e "${YELLOW}📋 Instructions:${NC}"
echo ""
echo "1. Open your browser and go to:"
echo -e "   ${BLUE}https://github.com/new${NC}"
echo ""
echo "2. Create a new repository with these settings:"
echo "   • Repository name: ${REPO_NAME}"
echo "   • Description: WAHA MOD - WhatsApp HTTP API with unlocked Plus features"
echo "   • Visibility: Your choice (Public or Private)"
echo "   • ⚠️  DO NOT initialize with README, .gitignore, or license"
echo ""
echo "3. Press Enter here after creating the repository..."
read -p ""

echo ""
echo -e "${GREEN}Step 2: Adding Remote and Pushing${NC}"
echo ""

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}ℹ️  Remote 'origin' already exists${NC}"
    CURRENT_ORIGIN=$(git remote get-url origin)
    echo "   Current URL: $CURRENT_ORIGIN"
    echo ""
    read -p "Do you want to change it to $GITHUB_URL? (y/n): " CHANGE_REMOTE
    
    if [ "$CHANGE_REMOTE" = "y" ] || [ "$CHANGE_REMOTE" = "Y" ]; then
        git remote set-url origin "$GITHUB_URL"
        echo -e "${GREEN}✅ Remote URL updated${NC}"
    fi
else
    git remote add origin "$GITHUB_URL"
    echo -e "${GREEN}✅ Remote 'origin' added${NC}"
fi

echo ""
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
echo ""

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo -e "${BLUE}📦 Your repository is now available at:${NC}"
    echo -e "   ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Visit your repository on GitHub"
    echo "2. Update repository description and topics"
    echo "3. Follow deployment guide in DEPLOY_COOLIFY.md"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Push failed${NC}"
    echo ""
    echo -e "${YELLOW}Common issues:${NC}"
    echo "1. Repository doesn't exist on GitHub"
    echo "2. Authentication failed (try using Personal Access Token)"
    echo "3. Branch name mismatch (we're using 'main')"
    echo ""
    echo "To fix authentication, use:"
    echo "  git remote set-url origin https://<token>@github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo ""
    exit 1
fi
