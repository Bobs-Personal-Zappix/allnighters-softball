# ⚾ Allnighters Softball Website
**allnighterssoftball.com · Est. 1992 · Peabody, MA**

A fully static website for the Allnighters Softball team. No server required.
Hosted on Cloudflare Pages · Content managed via Decap CMS · Code stored on GitHub.

---

## 📁 Site Structure

```
allnighters-softball/
├── index.html              Home page
├── schedule.html           Schedule & Results
├── stats.html              Player Stats (sortable, auto-BA)
├── roster.html             Roster with year toggle (1992–2026)
├── gallery.html            Photo & Video Gallery
├── history.html            Team History
├── proshop.html            Pro Shop (order request form)
├── _redirects              Cloudflare Pages URL routing
├── css/styles.css          Full design system
├── js/utils.js             Shared JS utilities
├── data/
│   ├── schedule-2026.json  ← UPDATE WEEKLY with results
│   ├── stats-2026.json     ← UPDATE WEEKLY with stats
│   ├── roster-2026.json    ← FILL IN player names/details
│   ├── roster-years.json   Year list for roster toggle
│   └── sponsors.json       Sponsor info & logos
├── images/
│   ├── logo.png            Team logo
│   ├── sponsors/           Sponsor logo images
│   ├── gallery/            Gallery photos (CMS-managed)
│   └── proshop/            Shop item photos
├── content/
│   ├── news/               News posts (markdown, CMS-managed)
│   ├── gallery/            Gallery metadata (markdown, CMS-managed)
│   └── proshop/            Shop items (markdown, CMS-managed)
└── admin/
    ├── index.html          Decap CMS entry point
    └── config.yml          CMS configuration ← EDIT before using
```

---

## 🚀 SETUP GUIDE — Do This Once

### STEP 1 — Create the GitHub Repository

1. Go to **github.com** and sign in as `Bobs-Personal-Zappix`
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `allnighters-softball`
4. Set to **Public** (required for free Cloudflare Pages + Decap CMS)
5. Do **NOT** check "Add a README" (you already have one)
6. Click **Create repository**
7. GitHub shows you a page with upload instructions — keep this open

---

### STEP 2 — Upload All Site Files to GitHub

**Option A — GitHub Web Upload (easiest for first-time):**
1. On your new empty repo page, click **"uploading an existing file"** link
2. Drag and drop ALL files and folders from this ZIP
3. Click **Commit changes**

**Option B — GitHub Desktop App (recommended going forward):**
1. Download **GitHub Desktop** from desktop.github.com
2. File → Clone repository → `Bobs-Personal-Zappix/allnighters-softball`
3. Copy all site files into the cloned folder
4. In GitHub Desktop: write a commit message → click **Commit to main** → **Push origin**

---

### STEP 3 — Connect to Cloudflare Pages

1. Log into **dash.cloudflare.com**
2. Left sidebar → **Pages** → **Create a project**
3. Click **Connect to Git** → Select **GitHub**
4. Authorize Cloudflare to access your GitHub account
5. Select the `allnighters-softball` repository
6. **Build settings:**
   - Framework preset: `None`
   - Build command: *(leave blank)*
   - Build output directory: `/` (or leave blank)
7. Click **Save and Deploy**
8. Cloudflare builds your site (takes ~30 seconds)
9. You'll get a URL like `allnighters-softball.pages.dev` — your site is live!

---

### STEP 4 — Connect Your Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `allnighterssoftball.com`
4. Follow the DNS instructions (since your domain is already on Cloudflare, this should be automatic)
5. Within minutes, **allnighterssoftball.com** is live ✅

---

### STEP 5 — Set Up the CMS Admin Panel

The CMS admin panel lives at: **allnighterssoftball.com/admin**

It uses GitHub for login, so you need to create a GitHub OAuth App:

**5a. Create GitHub OAuth App:**
1. Go to: **github.com/settings/developers**
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name:** Allnighters CMS
   - **Homepage URL:** `https://allnighterssoftball.com`
   - **Authorization callback URL:** `https://allnighterssoftball.com/admin/`
4. Click **Register application**
5. You'll see a **Client ID** on the next page — copy it
6. Click **Generate a new client secret** → copy the secret

**5b. Update the CMS config:**
1. Open `admin/config.yml` in your code editor (or GitHub web editor)
2. Find this line:
   ```yaml
   app_id: YOUR_GITHUB_OAUTH_APP_ID
   ```
3. Replace `YOUR_GITHUB_OAUTH_APP_ID` with the **Client ID** from step 5a
4. Save and push to GitHub
5. Cloudflare Pages auto-redeploys (takes ~30 seconds)

**5c. Log into the CMS:**
1. Go to `https://allnighterssoftball.com/admin`
2. Click **Login with GitHub**
3. Authorize the app
4. You're in! ✅

> **Note:** Only you (the GitHub repo owner) can log in. If you want to give other people admin access, add them as Collaborators on the GitHub repo.

---

## 📝 WEEKLY CONTENT UPDATES

### Update Game Results (after each game)
1. Go to **allnighterssoftball.com/admin**
2. Click **Schedule & Results** → **2026 Season Schedule**
3. Find the game you just played
4. Set **Result** to W, L, or T
5. Enter **Our Score** and **Their Score**
6. Click **Save** — site updates in ~30 seconds

### Update Player Stats (weekly)
1. Go to **allnighterssoftball.com/admin**
2. Click **Player Stats** → **2026 Season Stats**
3. Update each player's numbers (GP, AB, H, BB, K, 1B, 2B, 3B, HR, GS)
4. Update the **Last Updated** date
5. Click **Save** — Batting Average (AVG) is auto-calculated by the website

---

## 👥 FIRST-TIME ROSTER SETUP

You need to fill in your 25 player names before the site shows real players.

**Option A — Via CMS (easiest):**
1. Go to **allnighterssoftball.com/admin**
2. Click **Roster** → **2026 Roster**
3. Edit each player entry: Number, Name, Nickname, Positions, Fun Details
4. Click Save

**Option B — Direct JSON edit:**
Open `data/roster-2026.json` and replace each `"Player Name"` with real names.
Push to GitHub → site auto-updates.

---

## 📸 ADDING PHOTOS & VIDEOS

1. Go to **allnighterssoftball.com/admin**
2. Click **Photo Gallery** → **New Gallery Item**
3. Fill in Title, Date, Type (Photo or Video)
4. For photos: upload the image file
5. For videos: paste a YouTube embed URL (e.g. `https://www.youtube.com/embed/VIDEO_ID`)
6. Save → photo appears in the gallery

---

## ✉️ PRO SHOP EMAIL

The Pro Shop "Request to Buy" form sends to: **allnighterssoftball@gmail.com**

To change this email:
1. Open `proshop.html`
2. Find: `mailto:allnighterssoftball@gmail.com`
3. Replace with your actual email
4. Save and push to GitHub

---

## 📅 HOW TO ADD FUTURE SEASON SCHEDULES

Each year, create a new `data/schedule-YEAR.json` file following the same format
as `data/schedule-2026.json`. Add the year to `data/roster-years.json`.

---

## 🔄 AUTO-DEPLOY

Every time you save something via the CMS or push code to GitHub:
- Cloudflare Pages automatically rebuilds and deploys the site
- Live in ~30 seconds
- No manual steps needed

---

## 🆘 TROUBLESHOOTING

| Problem | Solution |
|---|---|
| CMS login not working | Double-check the `app_id` in `admin/config.yml` matches your GitHub OAuth App Client ID |
| Site not updating after CMS save | Wait 60 seconds, then hard-refresh (Ctrl+Shift+R). Check Cloudflare Pages dashboard for build status. |
| Images not showing | Make sure image files were pushed to the `/images/` folder in GitHub |
| Stats not showing | Check that `data/stats-2026.json` is valid JSON (no typos) |
| Domain not working | Check Cloudflare DNS — the Pages custom domain should have a CNAME record |

---

## 🌐 Key Links (once live)

- **Website:** https://allnighterssoftball.com
- **CMS Admin:** https://allnighterssoftball.com/admin
- **GitHub Repo:** https://github.com/Bobs-Personal-Zappix/allnighters-softball
- **Cloudflare Pages:** dash.cloudflare.com → Pages
- **League Website:** https://www.peabodymensintracitysoftballeague.com
- **Rainout Line:** (978) 977-2591 (after 5 PM)

---

*Built with ❤️ for the Allnighters · Est. 1992 · Peabody, Massachusetts*
