# 💕 Valentine's Day Website for Shelly

A single-page, fully client-side Valentine's Day site—no backend needed.

## How to run

Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge), or use a local server:

```bash
# From this folder:
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Editing the site

- **Change the name**: Search for `Shelly` in `index.html` (title and heading) and in `script.js` (voice greeting and Easter egg: search for `Shelly` and `secretName = 'shelly'`).
- **Add real photos**: In `index.html`, find the `.polaroid-frame` divs. Replace the inner `<div class="polaroid-img">` (with "Photo 1", etc.) with:
  ```html
  <img class="polaroid-img" src="your-photo.jpg" alt="Description">
  ```
  Keep the same `data-caption` on the parent for hover text.
- **Background music**: Add an MP3 URL or a local file path in the `<audio id="bg-music">` tag:
  ```html
  <source src="your-music.mp3" type="audio/mpeg">
  ```
- **Quiz questions/answers**: Edit the `quizData` array in `script.js` to change questions and multiple-choice options.
- **Easter egg**: By default, pressing **F2** reveals a prompt; typing **Shelly** (case-insensitive) triggers heart fireworks. Change `secretName` in `script.js` to match another name.

## Features

- Landing with pulsating heart, floating hearts, and “Will you be my Valentine?” with a dodging No button
- Heart Catcher game: catch falling hearts for points and encouragement
- Love Quiz with multiple choice and a sweet result
- Message Board: draw or type, with optional “Save your message” as PNG
- Photo wall with polaroid-style frames and hover captions
- Countdown to Valentine’s Day (nav ⭐)
- Heart cursor, confetti and heart burst on “Yes”, optional voice greeting and sound effects
- Responsive layout for mobile and desktop

All behavior is in HTML, CSS, and JavaScript; no server or backend required.

---

## Publish to GitHub Pages (send her a link)

To host the site at **https://riaan-lee.github.io/Baby/** so you can share one link:

1. **Open Terminal** and go to this project folder:
   ```bash
   cd /Users/riaanlee/Valentines
   ```

2. **Initialize Git** (if this folder isn’t a repo yet):
   ```bash
   git init
   git branch -M main
   ```

3. **Connect to your GitHub repo** (create the repo “Baby” on GitHub first if needed):
   ```bash
   git remote add origin https://github.com/Riaan-Lee/Baby.git
   ```

4. **Add everything (including assets)** and commit:
   ```bash
   git add index.html styles.css script.js README.md .gitignore
   git add assets/
   git status
   ```
   You should see `assets/music.mp3`, `assets/photo1.png`, `assets/photo2.png`, `assets/photo3.png` in the list. If any are missing, run `git add -A` then `git status` again.

   ```bash
   git commit -m "Valentine site for Shelly - all assets included"
   ```

5. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```
   (If the repo already had content, you may need `git pull origin main --rebase` first, then push.)

6. **Turn on GitHub Pages**:
   - On GitHub, open the **Baby** repo.
   - Go to **Settings** → **Pages** (left sidebar).
   - Under **Source**, choose **Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)**.
   - Save.

After a minute or two, the site will be at:

**https://riaan-lee.github.io/Baby/**

Send her that link; everything (photos, music, games) will work from there.
