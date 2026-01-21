# How to Share Your Website 🌍

I have successfully "built" your website! You now have a ready-to-share version in the `dist` folder.

### The Easiest Way to Share (Drag & Drop)

1.  Open this folder in your File Explorer:
    `e:\Aws learning website\dist`
    *(Make sure you open the **dist** folder, not the main one!)*

2.  Open your browser and search for: **"Netlify Drop"**
    (or go to `app.netlify.com/drop`)

3.  **Drag and Drop** the `dist` folder right onto that website page.

4.  Wait a few seconds... and **BOOM!** 🎉
    It will give you a real link (like `wonderful-site-123.netlify.app`).

5.  **Copy that link** and send it to your friends on WhatsApp/Discord!

### Warning
*   Do NOT drag the whole `Aws learning website` folder. Only drag the `dist` folder inside it.
*   That's it! No coding required.

---

### Alternate Option 2: Surge.sh (Command Line) - ✅ FREE FOREVER
If you prefer not to use a website, you can deploy directly from here:

1.  Open the terminal (Ctrl + `).
2.  Run this command (it will ask for email/password once to finish creating your free account):
    ```powershell
    npx surge ./dist
    ```
3.  It will give you a link like `tough-potato.surge.sh`.

### Alternate Option 3: GitHub Pages - ✅ FREE FOREVER
Use this if you have a GitHub account.

1.  **Create a New Repo** on GitHub.com (name it anything, e.g., `aws-learning`).
2.  **Run these commands** in your terminal one by one:

    ```powershell
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    npm run deploy
    ```

3.  Wait 2 minutes. Your site will be at: `https://YOUR_USERNAME.github.io/aws-learning/`.



