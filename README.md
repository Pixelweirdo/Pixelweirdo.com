# PixelWeirdo — Deployment Guide
## by PixelWeirdo (pixelweirdo.com)

---

## 🚀 Deploy to Netlify in 3 Steps

### Option A — Drag & Drop (Fastest, no account needed)
1. Go to **https://app.netlify.com/drop**
2. Drag the entire `pixelweirdo` folder onto the page
3. Your site is live at a free `.netlify.app` URL instantly

### Option B — GitHub + Netlify (Best for ongoing updates)
1. Create a free GitHub account at github.com
2. Create a new repository called `pixelweirdo`
3. Upload all files from this folder to the repo
4. Go to **netlify.com → Add new site → Import from Git**
5. Connect your GitHub repo → Deploy
6. ✅ Every time you push a new post to GitHub, the site updates automatically

---

## 🔗 Connect Your Custom Domain

Once deployed on Netlify:
1. Go to **Site settings → Domain management → Add custom domain**
2. Enter `pixelweirdo.com`
3. Update your DNS records as instructed by Netlify
4. Free SSL certificate is added automatically

---

## 📝 Adding New Blog Posts

### Step 1 — Copy the template
Copy any existing post from the `/posts/` folder, e.g.:
```
posts/dark-souls.html → posts/my-new-post.html
```

### Step 2 — Edit the content
Change:
- `<title>` in the `<head>`
- `<meta name="description">` 
- The `<h1>` title
- The post body content
- The poll questions and quiz
- The game pick affiliate block

### Step 3 — Add to blog.html
Open `blog.html` and add a new row inside `<div class="posts-list-grid" id="blog-list">`:
```html
<div class="post-row-card" data-cat="lessons" onclick="location.href='posts/my-new-post.html'">
  <div class="post-row-thumb" style="background:linear-gradient(135deg,#0a0a1a,#1a1030)">🎮</div>
  <div class="post-row-body">
    <span class="card-tag" style="font-size:0.32rem;padding:3px 8px;margin-bottom:8px;display:inline-block">Life Lessons</span>
    <div class="post-row-title">Your Post Title Here</div>
    <p class="post-row-excerpt">A short description of the post.</p>
    <div class="card-meta" style="font-size:0.75rem"><span>Month 2025</span></div>
  </div>
</div>
```

### Step 4 — Add to sitemap.xml
Add a new `<url>` block to `sitemap.xml`:
```xml
<url>
  <loc>https://pixelweirdo.com/posts/my-new-post.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 5 — Deploy
Drag the updated folder to Netlify, or push to GitHub.

---

## 💰 Activating Monetisation

### Google AdSense
1. Apply at https://adsense.google.com
2. Once approved, paste your AdSense `<script>` tag into the `<head>` of each HTML file
3. Replace the `ad-placeholder` divs with your AdSense ad unit code

### Affiliate Links (Amazon, Razer, etc.)
- Replace `href="#"` on all `Check Price →` / `SHOP ▶` buttons with your affiliate links
- Amazon Associates: https://affiliate-program.amazon.com
- Razer Affiliate: https://www.razer.com/affiliate

### Patreon
- Your Patreon URL is already set to: https://www.patreon.com/c/PixelWeirdo
- Update tier descriptions at any time in the Patreon section of `index.html`

---

## 📁 File Structure

```
pixelweirdo/
├── index.html          ← Homepage
├── blog.html           ← Blog listing page
├── games.html          ← Games page
├── about.html          ← About page
├── 404.html            ← Custom 404 error page
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← Search engine instructions
├── netlify.toml        ← Netlify configuration
├── css/
│   └── style.css       ← All site styles
├── js/
│   └── main.js         ← Polls, quizzes, comments, filters
├── images/
│   └── logo.png        ← PixelWeirdo logo
└── posts/
    ├── dark-souls.html
    ├── moving-out.html
    ├── overcooked.html
    ├── princess-peach.html
    ├── world-of-warcraft.html
    ├── last-of-us.html
    ├── the-sims.html
    ├── crash-bandicoot.html
    ├── pokemon.html
    ├── skyrim.html
    ├── fallout-3.html
    ├── amnesia.html
    ├── stardew-valley.html
    ├── hades.html
    ├── undertale.html
    └── rocket-league.html
```

---

## 🧠 Getting Claude to Write New Posts

Ask Claude:
> "Write me an PixelWeirdo blog post about [GAME] in the same style and HTML format as posts/dark-souls.html. 
> Include: personal opener, game info, life lesson parallel, peer-reviewed research, poll, quiz, and comment section.
> Use depth='../' for all asset links."

Claude will give you a ready-to-drop HTML file.

---

## ✉️ Contact & Support
- Email: mao@pixelweirdo.com
- Patreon: https://www.patreon.com/c/PixelWeirdo

---

## 🖼️ Adding Images (Unsplash)

The site ships with emoji + gradient placeholders. To replace them with real photography:

### Prerequisites
- Node.js installed (https://nodejs.org)
- Your Unsplash API key: `d06e76cc942e40958bc345653ec45dee`

### One-shot setup
```bash
node add-images.js
```

This runs two steps automatically:
1. **fetch-images.js** — Downloads one landscape photo per game from Unsplash into `images/posts/`
2. **inject-images.js** — Updates all HTML files to use the real photos

### What gets updated
- All 40 post pages (`posts/*.html`) — the hero banner image
- `blog.html` — all row card thumbnails
- `index.html` — featured card thumbnails
- `games.html` — carousel featured images
- `css/style.css` — new image styles appended

### Adding images for new posts
1. Add your post slug + search query to `fetch-images.js` → `GAMES` array
2. Re-run `node add-images.js`

### Photo credits
After running, photo credit data is saved to `images/posts/credits.json`.
Consider adding a credits page or footer link to comply with Unsplash license.
