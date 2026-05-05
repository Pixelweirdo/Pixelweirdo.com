#!/usr/bin/env node
/**
 * PixelWeirdo — Image Injector
 * After running fetch-images.js, run this script to:
 * 1. Replace emoji+gradient in post-hero-img with <img> tags in all /posts/*.html
 * 2. Replace emoji+gradient in post-row-thumb (blog.html) with <img> tags
 * 3. Replace emoji+gradient in card-thumb (index.html) with <img> tags
 * 4. Replace featured-emoji in games.html with <img> tags
 *
 * Run: node inject-images.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, 'posts');
const IMAGES_DIR = 'images/posts'; // relative path for HTML references

// Check which images were actually downloaded
function getAvailableImages() {
  const imgDir = path.join(ROOT, 'images', 'posts');
  if (!fs.existsSync(imgDir)) return new Set();
  return new Set(
    fs.readdirSync(imgDir)
      .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'))
      .map(f => f.replace(/\.(jpg|png|webp)$/, ''))
  );
}

// --- POST PAGES: replace post-hero-img ---
function updatePostHero(slug, html, depth = '../') {
  // Pattern: <div class="post-hero-img" style="background:...">[emoji]</div>
  const re = /<div class="post-hero-img"[^>]*>([^<]*)<\/div>/;
  if (!re.test(html)) return html;
  const imgSrc = `${depth}${IMAGES_DIR}/${slug}.jpg`;
  const replacement = `<div class="post-hero-img post-hero-img--photo">` +
    `<img src="${imgSrc}" alt="${slug.replace(/-/g, ' ')}" loading="lazy" onerror="this.parentElement.style.display='none'">` +
    `</div>`;
  return html.replace(re, replacement);
}

// --- BLOG.HTML: replace post-row-thumb ---
function updateBlogThumbs(html) {
  // Pattern: <div class="post-row-thumb" style="..." data-slug="SLUG">emoji</div>
  return html.replace(
    /<div class="post-row-thumb"([^>]*?)data-slug="([^"]+)"([^>]*)>[^<]*<\/div>/g,
    (match, before, slug, after) => {
      const imgSrc = `${IMAGES_DIR}/${slug}.jpg`;
      return `<div class="post-row-thumb post-row-thumb--photo"${before}data-slug="${slug}"${after}>` +
        `<img src="${imgSrc}" alt="${slug.replace(/-/g, ' ')}" loading="lazy" onerror="this.closest('.post-row-thumb').classList.remove('post-row-thumb--photo')">` +
        `</div>`;
    }
  );
}

// --- INDEX.HTML: replace card-thumb ---
function updateIndexCardThumbs(html) {
  // Pattern: <div class="card-thumb" style="..." data-slug="SLUG">emoji</div>
  return html.replace(
    /<div class="card-thumb"([^>]*?)data-slug="([^"]+)"([^>]*)>[^<]*<\/div>/g,
    (match, before, slug, after) => {
      const imgSrc = `${IMAGES_DIR}/${slug}.jpg`;
      return `<div class="card-thumb card-thumb--photo"${before}data-slug="${slug}"${after}>` +
        `<img src="${imgSrc}" alt="${slug.replace(/-/g, ' ')}" loading="lazy" onerror="this.closest('.card-thumb').classList.remove('card-thumb--photo')">` +
        `</div>`;
    }
  );
}

// --- GAMES.HTML: replace featured-thumb emoji ---
// Pattern: <div class="featured-thumb" style="..."><span class="featured-emoji">emoji</span></div>
// We need the slug from context — match the nearby href
function updateGamesFeatured(html) {
  // Games carousel: each slide has href to posts/SLUG.html and a featured-thumb
  return html.replace(
    /href="posts\/([^"]+)\.html"([^]*?)<div class="featured-thumb"([^>]*)>\s*<span class="featured-emoji">([^<]*)<\/span>/g,
    (match, slug, between, thumbAttrs, emoji) => {
      const imgSrc = `${IMAGES_DIR}/${slug}.jpg`;
      return `href="posts/${slug}.html"${between}<div class="featured-thumb featured-thumb--photo"${thumbAttrs}>` +
        `<img src="${imgSrc}" alt="${slug.replace(/-/g, ' ')}" loading="lazy" onerror="this.closest('.featured-thumb').classList.remove('featured-thumb--photo')">` +
        `<span class="featured-emoji featured-emoji--fallback">${emoji}</span>`;
    }
  );
}

// --- CSS additions ---
const CSS_ADDITIONS = `
/* ===== IMAGE INJECTION STYLES ===== */
/* Post hero photo */
.post-hero-img--photo {
  padding: 0;
  font-size: 0;
  overflow: hidden;
}
.post-hero-img--photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Blog list row thumb photo */
.post-row-thumb--photo {
  font-size: 0;
  aspect-ratio: 1/1;
}
.post-row-thumb--photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.35s ease;
}
.post-row-card:hover .post-row-thumb--photo img {
  transform: scale(1.06);
}

/* Index featured card thumb photo */
.card-thumb--photo {
  font-size: 0;
}
.card-thumb--photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.4s ease;
}
.post-card:hover .card-thumb--photo img {
  transform: scale(1.05);
}

/* Games carousel featured thumb photo */
.featured-thumb--photo {
  font-size: 0;
  overflow: hidden;
}
.featured-thumb--photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.featured-thumb--photo .featured-emoji--fallback {
  display: none;
}
/* ===== END IMAGE INJECTION STYLES ===== */
`;

function main() {
  const available = getAvailableImages();
  console.log(`🖼️  Found ${available.size} downloaded images\n`);

  if (available.size === 0) {
    console.log('⚠️  No images found — skipping injection (site will use gradient fallbacks).');
    process.exit(0);
  }

  // --- Update each post HTML ---
  const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.html'));
  let postsUpdated = 0;
  postFiles.forEach(file => {
    const slug = file.replace('.html', '');
    if (!available.has(slug)) {
      console.log(`  ⏭️  Skipping ${slug} (no image downloaded)`);
      return;
    }
    const filePath = path.join(POSTS_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const updated = updatePostHero(slug, html);
    if (updated !== html) {
      fs.writeFileSync(filePath, updated);
      postsUpdated++;
      console.log(`  ✅ posts/${file}`);
    } else {
      console.log(`  ⚠️  No post-hero-img found in ${file}`);
    }
  });

  // --- Update blog.html ---
  const blogPath = path.join(ROOT, 'blog.html');
  let blogHtml = fs.readFileSync(blogPath, 'utf8');
  const updatedBlog = updateBlogThumbs(blogHtml);
  fs.writeFileSync(blogPath, updatedBlog);
  console.log(`  ✅ blog.html (card thumbnails)`);

  // --- Update index.html ---
  const indexPath = path.join(ROOT, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const updatedIndex = updateIndexCardThumbs(indexHtml);
  fs.writeFileSync(indexPath, updatedIndex);
  console.log(`  ✅ index.html (featured card thumbs)`);

  // --- Update games.html ---
  const gamesPath = path.join(ROOT, 'games.html');
  let gamesHtml = fs.readFileSync(gamesPath, 'utf8');
  const updatedGames = updateGamesFeatured(gamesHtml);
  fs.writeFileSync(gamesPath, updatedGames);
  console.log(`  ✅ games.html (carousel featured thumbs)`);

  // --- Append CSS ---
  const cssPath = path.join(ROOT, 'css', 'style.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('IMAGE INJECTION STYLES')) {
    fs.writeFileSync(cssPath, css + CSS_ADDITIONS);
    console.log(`  ✅ css/style.css (image styles appended)`);
  } else {
    console.log(`  ℹ️  css/style.css already has image styles`);
  }

  console.log(`\n✨ Done! ${postsUpdated} posts updated + blog, index, games pages`);
  console.log('\n📦 Ready to deploy to Netlify!');
}

main();
