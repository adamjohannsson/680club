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

echo ""; echo ""; echo "Checking if firebase login is detected";
# Run firebase login:list and store output in variable
firebase_login_list=$(firebase login:list);

# If the variable text contains "No authorized accounts"
if [[ $firebase_login_list == *"No authorized accounts"* ]]; then
  echo "No firebase login detected after running \033[32mfirebase login:list\033[0m. Running \033[32mfirebase login\033[0m";
  firebase login;
else
  echo "Firebase login detected";
  echo $firebase_login_list;
fi

echo ""; echo ""; echo "Set prod env variables to .env file while deploying.";
cp .env.prod .env;

echo ""; echo ""; echo "Create production app build [PRESS ENTER TO CONTINUE]"; read;
npm run build;
echo "Finished creating a production app build";

echo ""; echo ""; echo "Deploy to Firebase [PRESS ENTER TO CONTINUE]"; read;
firebase deploy;
echo "Finished deploying to Firebase";

echo ""; echo ""; echo "Restore dev env variables to .env file after deploying";
cp .env.dev .env;

echo ""; echo ""; echo "\033[32mFinished deploying to Firebase\033[0m";
