# Use this script to pull the latest changes from the remote repository.

# This script will:
# 1. change your current branch to main
# 2. pull the latest changes from the remote repository

echo "Changing your current branch to main...";
git checkout main;
echo "Changed your current branch to main.";

echo "Pulling latest changes from remote repository...";
git pull;
echo "Pulled latest changes from remote repository.";