# 680 Club

# Live app:

### https://club680.web.app

# How to add new features

<details>
<summary>Clik to expand dev workflow </summary>

### Install dependencies and start the development server

```bash
npm install
npm start
```

### Set your environment variables

1. Go to .env.local.example
2. Duplicate the file and rename to .env.local
3. Update .env.local file with your own values

### Create new branch

On your local app you can start making changes. At any point you can create a new branch.

```bash
git checkout -b 680-<ticket-number>;
```

### Commit your changes

The following script prompts you for a commit message and then commits your changes to current branch, automagically prepending branch name to your commit message.

```bash
sh src/utils/git-commit.sh
```

### Push to remote

Once you've finished developing your feature, refactor or bugfix, you can push your branch to remote and create a PR in GitHub.

```bash
sh src/utils/git-push.sh
```

### Pull main from remote after your branch has been merged

After someone reviews and merges your PR into main, you can pull the latest changes from remote.

```bash
sh src/utils/git-pull.sh
```

</details>
  ·

# How to deploy

### Deploy to Firebase

Use this handy script to deploy to Firebase.

```bash
sh src/utils/deploy.sh
```
