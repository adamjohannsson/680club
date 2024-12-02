# Use this script with 'sh src/utils/deploy.sh' to deploy the app to Firebase
#
# Prerequisites:
# - Firebase CLI installed
# - Firebase project set up
# - Firebase project configured in the local environment
#
# This script does the following:
# 1. Set prod env variables
# 2. Run 'npm run build' to create a build directory with all relevant app content
# 3. Deploy app to Firebase
# 4. Restore dev env variables

echo ""; echo ""; echo "Set prod env variables to .env file while deploying"; read;
cp .env.prod .env;

echo ""; echo ""; echo "Create production app build"; read;
npm run build;
echo "Finished creating a production app build";

echo ""; echo ""; echo "Deploy to Firebase"; read;
firebase deploy;
echo "Finished deploying to Firebase";

echo ""; echo ""; echo "Restore dev env variables to .env file after deploying";
cp .env.dev .env;

# Change console text colour to green
echo ""; echo ""; echo "\033[32mFinished deploying to Firebase\033[0m";
