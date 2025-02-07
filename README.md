# Welcome to NEUWallet FrontEnd

##Prerequisites
Before proceeding, ensure you have the following installed on your system:

- Node.js: [Download and install Node.js](https://nodejs.org)
- Bun: [Install Bun](https://bun.sh/)
- Android Studio: [Download and install Android Studio](https://developer.android.com/studio)

## Get started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TheSpecsss/neu-wallet-frontend.git
   ```
2. **Navigate into the project folder:**
   ```bash 
   cd neu-wallet-frontend
   ```
3. Install dependencies

   ```bash
   bun install
   ```

4. Start the app

   ```bash
    bun x expo start
   ```
## Branching and Workflow

When you are assigned a new task or want to create a new feature, always create a new branch. Here's the complete workflow:

### 1. Create a new branch

Make sure you are on the main branch before creating a new branch:

```bash
git checkout main
git pull origin main
```

Create a new branch:

```bash
git checkout -b <task-number-feature-name>
```

### 2. Work on the new branch

Now you're ready to start coding! After making your changes, stage and commit them:

```bash
git add .
git commit -m "Describe your changes"
```

### 3. Push your branch to GitHub

Once you've committed your changes, push your branch:

```bash
git push origin <feature-branch-name>
```

### 4. Open a Pull Request

Go to the GitHub repository page. Open a Pull Request from your feature branch into main. Wait for approval and any necessary code reviews.

### 5. Merge the Pull Request

Once the PR is approved, you'll see the comment/s for approval or something that needs to be changed or updated.

### 6. Clean up branches

After merging, you can delete the feature branch both locally and on GitHub:

Checkout on your local main branch:
```bash
git checkout main
git pull
```

**Locally:**
```bash
git branch -d <feature-branch-name>
```

**On GitHub:**
```bash
git push origin --delete <feature-branch-name>
```

### 7. Pulling all the recent changes

Ensuring everything works fine, you should pull all the recent changes from the main repository BEFORE DOING SOMETHING ELSE AGAIN:

```bash
git pull
```
