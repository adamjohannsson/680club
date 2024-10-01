# Use this script with 'sh src/utils/git-push.sh' to push the local branch to remote 
# without having to type the branch name manually.

echo "Pushing local branch to remote.";
echo "Press [ctrl+c] to cancel. Press [enter] to continue.";
read;

git branch --show-current | xargs -I ${branch-name} git push origin ${branch-name};

echo "Pushed to remote";