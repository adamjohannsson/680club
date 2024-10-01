# Use this script with 'sh src/utils/deploy.sh' to deploy the app to Firebase
#
# Prerequisites:
# - Firebase CLI installed
# - Firebase project set up
# - Firebase project configured in the local environment
#
# This script does the following:
# 1. Run 'npm run build' to create a build directory with all relevant app content
# 2. Deploy app to Firebase

echo "Creating a production app build";
npm run build;
echo "Finished creating a production app build";

echo "Deploying to Firebase";
firebase deploy;
echo "Finished deploying to Firebase";