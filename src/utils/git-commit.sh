# Use this script with 'sh src/utils/git-commit.sh' to commit your changes to the current branch.

# This script will:
# 1. Prompt you to enter a commit message 
# 2. Commit your changes to the current branch, automatically prependint the branch name to your commit message.
clear;

echo "Write your commit message, then press [enter].";
echo "";

echo "Please follow this format: ";
echo "'Add User authentication'";
echo "'Refactor payment delay functionality'";
echo "'Fix bug where User could not press login button'";
echo "";

echo "Notice: no need to write current branch name - it will be added automagically.";
echo "";

echo "Your commit message:";
read commitmessage;

git branch --show-current | xargs -I ${branch-name} git commit -m "${branch-name} ${commitmessage}";