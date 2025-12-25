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

1.  Initialize Git: `git init`
2.  Add files: `git add .`  and `git commit -m "initial"`
3.  Push to a new GitHub repo.
4.  Go to Repo Settings -> Pages -> Source: `gh-pages` branch (after setting it up).
    *(This is more complex, stick to Surge/Netlify for speed!)*


